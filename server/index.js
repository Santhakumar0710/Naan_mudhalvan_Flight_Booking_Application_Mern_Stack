import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { userRoutes } from './controllers/userController.js'; 

import { flightRoutes } from './controllers/flightController.js';
import { bookingRoutes } from './controllers/bookingController.js';
import { authenticateToken } from './middlewares/authenticateToken.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const PORT = 6001;
const DB_URI = 'mongodb://localhost:27017/FlightBookingMERN';

// MongoDB connection
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Register routes
    app.use('/register', userRoutes);
    app.use('/login', userRoutes);
    app.use('/approve-operator', authenticateToken, userRoutes);
    app.use('/reject-operator', authenticateToken, userRoutes);
    app.use('/fetch-users', authenticateToken, userRoutes);
    app.use('/add-flight', authenticateToken, flightRoutes);
    app.use('/update-flight', authenticateToken, flightRoutes);
    app.use('/fetch-flights', authenticateToken, flightRoutes);
    app.use('/fetch-bookings', authenticateToken, bookingRoutes);
    app.use('/book-ticket', authenticateToken, bookingRoutes);
    app.use('/cancel-ticket', authenticateToken, bookingRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((e) => console.log(`Error in DB connection: ${e}`));
