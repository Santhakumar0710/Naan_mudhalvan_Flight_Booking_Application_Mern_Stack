// server/models/Flight.js
import mongoose from 'mongoose';

// Define the flight schema
const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

// Create the Flight model based on the schema
const Flight = mongoose.model('Flight', flightSchema);

export default Flight;