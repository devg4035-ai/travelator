const express = require('express');
const router = express.Router();

// Mock database for bookings
let bookings = [];

const normalizeStoredBooking = (payload) => {
    if (payload && payload.booking && payload.type) {
        return {
            id: payload.booking.id || Date.now(),
            type: payload.type,
            booking: payload.booking,
            updatedAt: new Date().toISOString(),
        };
    }

    return {
        id: payload.id || Date.now(),
        type: payload.type || 'generic',
        booking: payload.booking || payload,
        updatedAt: new Date().toISOString(),
    };
};

// Create a booking
router.post('/', (req, res) => {
    const incoming = normalizeStoredBooking(req.body || {});
    const existingIndex = bookings.findIndex(
        b => String(b.id) === String(incoming.id) && String(b.type) === String(incoming.type)
    );

    if (existingIndex >= 0) {
        bookings[existingIndex] = {
            ...bookings[existingIndex],
            ...incoming,
            booking: {
                ...bookings[existingIndex].booking,
                ...incoming.booking,
            },
        };
        return res.status(200).json(bookings[existingIndex]);
    }

    bookings.push(incoming);
    res.status(201).json(incoming);
});

router.post('/:type/:id/verify', (req, res) => {
    const { type, id } = req.params;
    const { receiptNumber, amount } = req.body || {};

    const record = bookings.find(
        b => String(b.type) === String(type) && String(b.id) === String(id)
    );

    if (!record) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    record.booking.paymentStatus = 'paid';
    record.booking.receiptNumber = receiptNumber || `R-${Date.now()}`;
    record.booking.paidAmount = Number(amount || record.booking.price || 0);
    record.updatedAt = new Date().toISOString();

    return res.json({
        success: true,
        booking: record.booking,
    });
});

// Read all bookings
router.get('/', (req, res) => {
    res.json(bookings);
});

// Read a single booking
router.get('/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).send('Booking not found');
    res.json(booking);
});

// Update a booking
router.put('/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).send('Booking not found');
    Object.assign(booking, req.body);
    res.json(booking);
});

// Delete a booking
router.delete('/:id', (req, res) => {
    const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id));
    if (bookingIndex === -1) return res.status(404).send('Booking not found');
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
});

module.exports = router;