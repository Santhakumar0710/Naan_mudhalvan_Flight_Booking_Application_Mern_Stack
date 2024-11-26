// server/models/Booking.js
import mongoose from 'mongoose';

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to User
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },  // Link to Flight
  seatsBooked: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },  // Booking status (Pending, Confirmed, etc.)
});

// Create the Booking model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;