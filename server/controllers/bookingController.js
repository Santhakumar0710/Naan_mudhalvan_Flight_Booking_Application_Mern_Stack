import Booking from '../models/Booking.js';
import express from 'express'; 
export const bookingRoutes = express.Router();

// Fetch bookings
bookingRoutes.get('/fetch-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred' });
  }
});

// Book ticket
bookingRoutes.post('/book-ticket', async (req, res) => {
  const { user, flight, flightName, flightId, departure, destination, email, mobile, passengers, totalPrice, journeyDate, journeyTime, seatClass } = req.body;
  try {
    const bookings = await Booking.find({ flight, journeyDate, seatClass });
    const numBookedSeats = bookings.reduce((acc, booking) => acc + booking.passengers.length, 0);
    const seats = '';  // Handle seat assignment logic
    const booking = new Booking({
      user,
      flight,
      flightName,
      flightId,
      departure,
      destination,
      email,
      mobile,
      passengers,
      totalPrice,
      journeyDate,
      journeyTime,
      seatClass,
    });

    await booking.save();
    res.json({ message: 'Ticket booked successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred' });
  }
});

// Cancel ticket
bookingRoutes.delete('/cancel-ticket', async (req, res) => {
  const { bookingId } = req.body;
  try {
    await Booking.findByIdAndDelete(bookingId);
    res.json({ message: 'Ticket canceled' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred' });
  }
});
