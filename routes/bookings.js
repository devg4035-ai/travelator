const express = require('express');
const router = express.Router();

// Mock database for bookings
let bookings = [];

// Create a booking
router.post('/', (req, res) => {
    const booking = req.body;
    booking.id = bookings.length + 1; // Simple ID generation
    bookings.push(booking);
    res.status(201).json(booking);
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