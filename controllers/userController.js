const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

const generateToken = (userId) =>
    jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'development_jwt_secret_change_me',
        { expiresIn: '7d' }
    );

const sanitizeUser = (user) => ({
    _id: user._id,
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    nationality: user.nationality,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    pincode: user.pincode,
    passportNumber: user.passportNumber,
    passportExpiry: user.passportExpiry,
    emergencyContactName: user.emergencyContactName,
    emergencyContactPhone: user.emergencyContactPhone,
    currency: user.currency,
    timezone: user.timezone,
    languages: user.languages,
    travelPreferences: user.travelPreferences,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('username, email, and password are required');
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        res.status(409);
        throw new Error('Email is already registered');
    }

    const user = await User.create({
        username: String(username).trim(),
        email: normalizedEmail,
        password,
    });

    res.status(201).json({
        success: true,
        data: sanitizeUser(user),
        token: generateToken(user._id),
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('email and password are required');
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    res.json({
        success: true,
        data: sanitizeUser(user),
        token: generateToken(user._id),
    });
});

// Get current user profile (authenticated)
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        success: true,
        data: sanitizeUser(user),
    });
});

// Update current user profile (authenticated)
const updateProfile = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        dateOfBirth,
        gender,
        nationality,
        phone,
        address,
        city,
        state,
        pincode,
        passportNumber,
        passportExpiry,
        emergencyContactName,
        emergencyContactPhone,
        currency,
        timezone,
        languages,
        travelPreferences,
    } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check email uniqueness if email is being changed
    if (email && email !== user.email) {
        const normalizedEmail = String(email).toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            res.status(409);
            throw new Error('Email is already registered');
        }
        user.email = normalizedEmail;
    }

    // Update profile fields
    if (username !== undefined) user.username = String(username).trim();
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    if (gender !== undefined) user.gender = gender;
    if (nationality !== undefined) user.nationality = String(nationality).trim();
    if (phone !== undefined) user.phone = String(phone).trim();
    if (address !== undefined) user.address = String(address).trim();
    if (city !== undefined) user.city = String(city).trim();
    if (state !== undefined) user.state = String(state).trim();
    if (pincode !== undefined) user.pincode = String(pincode).trim();
    if (passportNumber !== undefined) user.passportNumber = String(passportNumber).trim();
    if (passportExpiry !== undefined) user.passportExpiry = passportExpiry ? new Date(passportExpiry) : null;
    if (emergencyContactName !== undefined) user.emergencyContactName = String(emergencyContactName).trim();
    if (emergencyContactPhone !== undefined) user.emergencyContactPhone = String(emergencyContactPhone).trim();
    if (currency !== undefined) user.currency = currency;
    if (timezone !== undefined) user.timezone = String(timezone).trim();
    if (languages !== undefined) user.languages = String(languages).trim();
    
    // Update travel preferences
    if (travelPreferences !== undefined) {
        user.travelPreferences = {
            luxuryHotels: travelPreferences.luxuryHotels !== undefined ? travelPreferences.luxuryHotels : user.travelPreferences.luxuryHotels,
            directFlights: travelPreferences.directFlights !== undefined ? travelPreferences.directFlights : user.travelPreferences.directFlights,
            budgetFriendly: travelPreferences.budgetFriendly !== undefined ? travelPreferences.budgetFriendly : user.travelPreferences.budgetFriendly,
            vacationPackages: travelPreferences.vacationPackages !== undefined ? travelPreferences.vacationPackages : user.travelPreferences.vacationPackages,
            travelInsurance: travelPreferences.travelInsurance !== undefined ? travelPreferences.travelInsurance : user.travelPreferences.travelInsurance,
            vegetarianMeals: travelPreferences.vegetarianMeals !== undefined ? travelPreferences.vegetarianMeals : user.travelPreferences.vegetarianMeals,
            windowSeat: travelPreferences.windowSeat !== undefined ? travelPreferences.windowSeat : user.travelPreferences.windowSeat,
            flexibleDates: travelPreferences.flexibleDates !== undefined ? travelPreferences.flexibleDates : user.travelPreferences.flexibleDates,
            ecoFriendly: travelPreferences.ecoFriendly !== undefined ? travelPreferences.ecoFriendly : user.travelPreferences.ecoFriendly,
            loyaltyProgram: travelPreferences.loyaltyProgram !== undefined ? travelPreferences.loyaltyProgram : user.travelPreferences.loyaltyProgram,
        };
    }

    await user.save();

    res.json({
        success: true,
        message: 'Profile updated successfully',
        data: sanitizeUser(user),
    });
});

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('username, email, and password are required');
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        res.status(409);
        throw new Error('User already exists with this email');
    }

    const user = await User.create({
        username: String(username).trim(),
        email: normalizedEmail,
        password,
    });

    res.status(201).json({
        success: true,
        data: sanitizeUser(user),
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid user id');
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({ success: true, data: user });
});

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid user id');
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (email && email !== user.email) {
        const existingUser = await User.findOne({ email: String(email).toLowerCase() });
        if (existingUser && String(existingUser._id) !== id) {
            res.status(409);
            throw new Error('Another user already uses this email');
        }
    }

    if (username !== undefined) user.username = String(username).trim();
    if (email !== undefined) user.email = String(email).toLowerCase().trim();

    await user.save();

    res.json({
        success: true,
        data: sanitizeUser(user),
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid user id');
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({ success: true, message: 'User deleted successfully' });
});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
