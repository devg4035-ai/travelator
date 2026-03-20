const mongoose = require('mongoose');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email: String(email).toLowerCase() });
    if (existingUser) {
        res.status(409);
        throw new Error('User already exists with this email');
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
        success: true,
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
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
    const { name, email, role } = req.body;

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

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;

    await user.save();

    res.json({
        success: true,
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
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
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
