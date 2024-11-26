import Flight from '../models/Flight.js';
import express from 'express'; 

export const flightRoutes = express.Router();

// Add flight
flightRoutes.post('/', async (req, res) => {
  const { flightName, flightId, origin, destination, departureTime, arrivalTime, basePrice, totalSeats } = req.body;
  try {
    const flight = new Flight({
      flightName,
      flightId,
      origin,
      destination,
      departureTime,
      arrivalTime,
      basePrice,
      totalSeats,
    });
    await flight.save();
    res.json({ message: 'Flight added' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred' });
  }
});

// Update flight
flightRoutes.put('/update-flight', async (req, res) => {
  const { _id, flightName, flightId, origin, destination, departureTime, arrivalTime, basePrice, totalSeats } = req.body;
  try {
    const flight = await Flight.findById(_id);
    flight.flightName = flightName;
    flight.flightId = flightId;
    flight.origin = origin;
    flight.destination = destination;
    flight.departureTime = departureTime;
    flight.arrivalTime = arrivalTime;
    flight.basePrice = basePrice;
    flight.totalSeats = totalSeats;

    await flight.save();
    res.json({ message: 'Flight updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred' });
  }
});

// Fetch flights
flightRoutes.get('/fetch-flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred' });
  }
});