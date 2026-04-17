const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        res.status(401);
        throw new Error('Not authorized to access this route');
    }

    try {
        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'development_jwt_secret_change_me'
        );

        // Find user by ID and attach to request
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized to access this route');
    }
};

module.exports = { protect };
