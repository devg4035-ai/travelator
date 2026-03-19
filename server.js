const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic routes
app.get('/', (req, res) => {
    res.send('Welcome to the Travelator API!');
});

// In-memory storage (for demo purposes, replace with real DB in production)
const hotelBookings = [];
const flightBookings = [];

// Create/Sync booking endpoint
app.post('/api/bookings', (req, res) => {
    const { type, booking } = req.body;
    if (!type || !booking) {
        return res.status(400).json({ error: 'Missing type or booking object' });
    }

    const store = type === 'hotel' ? hotelBookings : flightBookings;
    const existingIndex = store.findIndex(b => b.id === booking.id);

    if (existingIndex !== -1) {
        store[existingIndex] = { ...store[existingIndex], ...booking };
    } else {
        store.push(booking);
    }

    return res.status(201).json({ message: 'Booking synced', booking });
});

// Verify payment endpoint
app.post('/api/bookings/:type/:id/verify', (req, res) => {
    const { type, id } = req.params;
    const { receiptNumber, amount } = req.body;

    if (!receiptNumber || !amount) {
        return res.status(400).json({ error: 'Missing receipt number or amount' });
    }

    const store = type === 'hotel' ? hotelBookings : flightBookings;
    const booking = store.find(b => String(b.id) === String(id));

    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    // Here you could plug into a real UPI/Payment gateway for verification
    // For demo, we simulate success for non-empty receipt.
    booking.paymentStatus = 'paid';
    booking.receiptNumber = receiptNumber;

    return res.json({
        message: 'Payment verified',
        booking,
        verifiedAt: new Date().toISOString()
    });
});

// Fetch bookings by type
app.get('/api/bookings/:type', (req, res) => {
    const { type } = req.params;
    const store = type === 'hotel' ? hotelBookings : flightBookings;
    res.json(store);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
