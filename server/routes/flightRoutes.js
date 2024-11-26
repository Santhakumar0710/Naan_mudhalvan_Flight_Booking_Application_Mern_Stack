import express from 'express';
import { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight } from '../controllers/flightController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new flight (Admin or Authorized User)
router.post('/flights', authenticateToken, createFlight);

// Route to get all flights
router.get('/flights', getAllFlights);

// Route to get a specific flight by its ID
router.get('/flights/:flightId', getFlightById);

// Route to update a flight (Admin or Authorized User)
router.put('/flights/:flightId', authenticateToken, updateFlight);

// Route to delete a flight (Admin or Authorized User)
router.delete('/flights/:flightId', authenticateToken, deleteFlight);

export default router;