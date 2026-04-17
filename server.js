const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const http = require('http');
const { WebSocketServer } = require('ws');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bookingRoutes = require('./routes/bookings');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SEAT_LOCK_MS = 5 * 60 * 1000;

const seatLocks = new Map();
const bookedSeats = new Map();

const getSeatLockKey = (flightKey, seatNumber) => `${flightKey}::${seatNumber}`;

const cleanupExpiredLocks = () => {
    const now = Date.now();
    for (const [key, lock] of seatLocks.entries()) {
        if (lock.expiresAt <= now) {
            seatLocks.delete(key);
        }
    }
};

const getFlightLocks = (flightKey) => {
    cleanupExpiredLocks();
    const locks = [];
    for (const [key, lock] of seatLocks.entries()) {
        if (lock.flightKey === flightKey) {
            locks.push({
                seatNumber: lock.seatNumber,
                clientId: lock.clientId,
                expiresAt: lock.expiresAt,
            });
        }
    }
    return locks;
};

const getFlightBookedSeats = (flightKey) =>
    Array.from(bookedSeats.get(flightKey) || []).map((seatNumber) => ({ seatNumber }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postJson = (url, headers, payload) =>
    new Promise((resolve, reject) => {
        const requestUrl = new URL(url);
        const body = JSON.stringify(payload);

        const req = https.request(
            {
                protocol: requestUrl.protocol,
                hostname: requestUrl.hostname,
                port: requestUrl.port || 443,
                path: `${requestUrl.pathname}${requestUrl.search}`,
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Length': Buffer.byteLength(body),
                },
            },
            (response) => {
                let raw = '';

                response.on('data', (chunk) => {
                    raw += chunk;
                });

                response.on('end', () => {
                    let parsed;

                    try {
                        parsed = raw ? JSON.parse(raw) : {};
                    } catch (error) {
                        return reject(new Error('Invalid JSON response from translation provider'));
                    }

                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        return resolve(parsed);
                    }

                    return reject(
                        new Error(
                            parsed?.error?.message ||
                                `Translation provider error (${response.statusCode})`
                        )
                    );
                });
            }
        );

        req.on('error', (error) => reject(error));
        req.write(body);
        req.end();
    });

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Travelator API is running',
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            orders: '/api/orders',
            legacyBookings: '/api/bookings',
        },
    });
});

app.use('/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bookings', bookingRoutes);

app.post('/api/translate', async (req, res) => {
    try {
        const { text, from, to } = req.body || {};

        if (!text || !from || !to) {
            return res.status(400).json({
                success: false,
                message: 'text, from, and to are required',
            });
        }

        const key = process.env.AZURE_TRANSLATOR_KEY;
        const region = process.env.AZURE_TRANSLATOR_REGION;
        const endpoint = (process.env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com').replace(/\/$/, '');

        if (!key || !region) {
            return res.status(500).json({
                success: false,
                message: 'Translator service is not configured on server',
            });
        }

        const url = `${endpoint}/translate?api-version=3.0&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

        const data = await postJson(
            url,
            {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': region,
                'Content-Type': 'application/json',
            },
            [{ Text: text }]
        );

        const translatedText = data?.[0]?.translations?.[0]?.text || '';

        return res.json({
            success: true,
            translatedText,
        });
    } catch (error) {
        return res.status(502).json({
            success: false,
            message: error.message || 'Translation request failed',
        });
    }
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        const server = http.createServer(app);
        const wss = new WebSocketServer({ server, path: '/ws/seats' });

        const broadcastFlightState = (flightKey) => {
            const payload = JSON.stringify({
                type: 'seat_state',
                flightKey,
                locks: getFlightLocks(flightKey),
                booked: getFlightBookedSeats(flightKey),
            });

            for (const client of wss.clients) {
                if (client.readyState === 1 && client.flightKey === flightKey) {
                    client.send(payload);
                }
            }
        };

        setInterval(() => {
            cleanupExpiredLocks();
            const flightKeys = new Set();
            for (const lock of seatLocks.values()) {
                flightKeys.add(lock.flightKey);
            }
            for (const flightKey of flightKeys) {
                broadcastFlightState(flightKey);
            }
        }, 5000).unref();

        wss.on('connection', (ws) => {
            ws.clientId = null;
            ws.flightKey = null;

            ws.on('message', (raw) => {
                let msg;
                try {
                    msg = JSON.parse(String(raw));
                } catch (error) {
                    return;
                }

                if (msg.type === 'subscribe') {
                    ws.clientId = String(msg.clientId || 'anon');
                    ws.flightKey = String(msg.flightKey || '');
                    if (!ws.flightKey) return;

                    ws.send(
                        JSON.stringify({
                            type: 'seat_state',
                            flightKey: ws.flightKey,
                            locks: getFlightLocks(ws.flightKey),
                            booked: getFlightBookedSeats(ws.flightKey),
                        })
                    );
                    return;
                }

                if (!ws.flightKey || !ws.clientId) return;

                if (msg.type === 'lock_seat') {
                    const seatNumber = String(msg.seatNumber || '');
                    if (!seatNumber) return;

                    const alreadyBooked = (bookedSeats.get(ws.flightKey) || new Set()).has(seatNumber);
                    if (alreadyBooked) {
                        ws.send(
                            JSON.stringify({
                                type: 'lock_rejected',
                                seatNumber,
                                reason: 'Seat already booked',
                            })
                        );
                        return;
                    }

                    const key = getSeatLockKey(ws.flightKey, seatNumber);
                    const existing = seatLocks.get(key);
                    const now = Date.now();

                    if (existing && existing.expiresAt > now && existing.clientId !== ws.clientId) {
                        ws.send(
                            JSON.stringify({
                                type: 'lock_rejected',
                                seatNumber,
                                reason: 'Seat locked by another traveler',
                            })
                        );
                        return;
                    }

                    const expiresAt = now + SEAT_LOCK_MS;
                    seatLocks.set(key, {
                        flightKey: ws.flightKey,
                        seatNumber,
                        clientId: ws.clientId,
                        expiresAt,
                    });

                    ws.send(
                        JSON.stringify({
                            type: 'lock_acquired',
                            seatNumber,
                            expiresAt,
                        })
                    );
                    broadcastFlightState(ws.flightKey);
                    return;
                }

                if (msg.type === 'release_seat') {
                    const seatNumber = String(msg.seatNumber || '');
                    if (!seatNumber) return;
                    const key = getSeatLockKey(ws.flightKey, seatNumber);
                    const existing = seatLocks.get(key);

                    if (existing && existing.clientId === ws.clientId) {
                        seatLocks.delete(key);
                        broadcastFlightState(ws.flightKey);
                    }
                    return;
                }

                if (msg.type === 'confirm_seat') {
                    const seatNumber = String(msg.seatNumber || '');
                    if (!seatNumber) return;
                    const key = getSeatLockKey(ws.flightKey, seatNumber);
                    const existing = seatLocks.get(key);

                    if (existing && existing.clientId === ws.clientId) {
                        seatLocks.delete(key);
                        if (!bookedSeats.has(ws.flightKey)) {
                            bookedSeats.set(ws.flightKey, new Set());
                        }
                        bookedSeats.get(ws.flightKey).add(seatNumber);
                        broadcastFlightState(ws.flightKey);
                    }
                }
            });

            ws.on('close', () => {
                if (!ws.clientId) return;
                const affectedFlights = new Set();
                for (const [key, lock] of seatLocks.entries()) {
                    if (lock.clientId === ws.clientId) {
                        seatLocks.delete(key);
                        affectedFlights.add(lock.flightKey);
                    }
                }
                for (const flightKey of affectedFlights) {
                    broadcastFlightState(flightKey);
                }
            });
        });

        // Enable socket reuse to allow quick restarts
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`\n❌ Port ${PORT} is already in use. Retrying...\n`);
                setTimeout(() => {
                    server.close();
                    server.listen(PORT, '0.0.0.0');
                }, 1500);
            } else {
                console.error('Server error:', error);
                process.exit(1);
            }
        });

        server.listen(PORT, '0.0.0.0', () => {
            const host = require('os').networkInterfaces();
            const ips = Object.values(host)
                .flat()
                .filter(iface => iface.family === 'IPv4' && !iface.internal)
                .map(iface => iface.address);
            
            console.log(`\n✓ Server running on port ${PORT}`);
            console.log(`\n📱 Access from this device: http://localhost:${PORT}`);
            if (ips.length > 0) {
                console.log(`📱 Access from other devices on network:`);
                ips.forEach(ip => console.log(`   http://${ip}:${PORT}`));
            }
            console.log('\n');
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n\nShutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
            setTimeout(() => {
                console.error('Forced shutdown');
                process.exit(1);
            }, 5000);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
