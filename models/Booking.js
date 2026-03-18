const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flightBooking: {
        flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
        seatNumber: { type: String, required: true },
        departureDate: { type: Date, required: true },
    },
    hotelBooking: {
        hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
        roomNumber: { type: String, required: true },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
    },
    travelPackageBooking: {
        packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'TravelPackage', required: true },
        dateBooked: { type: Date, default: Date.now },
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);