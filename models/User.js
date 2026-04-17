const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    // Profile fields
    dateOfBirth: {
        type: Date,
        default: null,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'nonbinary', 'prefer_not_to_say'],
        default: 'prefer_not_to_say',
    },
    nationality: {
        type: String,
        default: '',
        trim: true,
    },
    phone: {
        type: String,
        default: '',
        trim: true,
    },
    address: {
        type: String,
        default: '',
        trim: true,
    },
    city: {
        type: String,
        default: '',
        trim: true,
    },
    state: {
        type: String,
        default: '',
        trim: true,
    },
    pincode: {
        type: String,
        default: '',
        trim: true,
    },
    passportNumber: {
        type: String,
        default: '',
        trim: true,
    },
    passportExpiry: {
        type: Date,
        default: null,
    },
    emergencyContactName: {
        type: String,
        default: '',
        trim: true,
    },
    emergencyContactPhone: {
        type: String,
        default: '',
        trim: true,
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR', 'GBP'],
        default: 'INR',
    },
    timezone: {
        type: String,
        default: 'Asia/Kolkata',
        trim: true,
    },
    languages: {
        type: String,
        default: 'English',
        trim: true,
    },
    // Travel preferences
    travelPreferences: {
        luxuryHotels: { type: Boolean, default: true },
        directFlights: { type: Boolean, default: true },
        budgetFriendly: { type: Boolean, default: false },
        vacationPackages: { type: Boolean, default: true },
        travelInsurance: { type: Boolean, default: false },
        vegetarianMeals: { type: Boolean, default: false },
        windowSeat: { type: Boolean, default: false },
        flexibleDates: { type: Boolean, default: false },
        ecoFriendly: { type: Boolean, default: false },
        loyaltyProgram: { type: Boolean, default: true },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        this.updatedAt = Date.now();
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
