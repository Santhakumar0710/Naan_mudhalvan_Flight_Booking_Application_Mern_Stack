import express from 'express';
import { createBooking, getBookingDetails, getAllBookings } from '../controllers/bookingController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new booking
router.post('/bookings', authenticateToken, createBooking);

// Route to get all bookings (can be for a specific user or all bookings)
router.get('/bookings', authenticateToken, getAllBookings);

// Route to get details of a specific booking
router.get('/bookings/:bookingId', authenticateToken, getBookingDetails);

export default router;