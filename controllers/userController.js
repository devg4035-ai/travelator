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
    createdAt: user.createdAt,
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
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
