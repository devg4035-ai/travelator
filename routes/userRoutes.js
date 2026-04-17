const express = require('express');
const {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes - require authentication
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateProfile);

// Admin routes
router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
