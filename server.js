const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bookingRoutes = require('./routes/bookings');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
