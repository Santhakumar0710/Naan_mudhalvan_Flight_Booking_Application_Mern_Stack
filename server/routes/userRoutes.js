import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // To check for valid token

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login an existing user
router.post('/login', loginUser);

// Route to fetch the user profile (Protected route)
router.get('/profile', authenticateToken, getUserProfile);

export default router;
