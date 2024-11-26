import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AllFlights.css";

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  // Ref to check if the component is mounted
  const isMounted = useRef(true);

  // Effect to fetch flights on mount
  useEffect(() => {
    fetchFlights();
    return () => {
      isMounted.current = false; // Cleanup to prevent state updates on unmounted components
    };
  }, []);

  // Safe state update utility
  const safeSetState = (setter) => (value) => {
    if (isMounted.current) setter(value);
  };

  // Fetch flights from the server
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-flights");
      safeSetState(setFlights)(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error.message);
    }
  };

  return (
    <div className="allFlightsPage">
      <h1>All Flights</h1>

      <div className="allFlights">
        {flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          flights.map((flight) => (
            <div className="allFlights-Flight" key={flight._id}>
              <p>
                <b>_id:</b> {flight._id}
              </p>
              <span>
                <p>
                  <b>Flight Id:</b> {flight.flightId}
                </p>
                <p>
                  <b>Flight name:</b> {flight.flightName}
                </p>
              </span>
              <span>
                <p>
                  <b>Starting station:</b> {flight.origin}
                </p>
                <p>
                  <b>Departure time:</b> {flight.departureTime}
                </p>
              </span>
              <span>
                <p>
                  <b>Destination:</b> {flight.destination}
                </p>
                <p>
                  <b>Arrival time:</b> {flight.arrivalTime}
                </p>
              </span>
              <span>
                <p>
                  <b>Base price:</b> {flight.basePrice}
                </p>
                <p>
                  <b>Total seats:</b> {flight.totalSeats}
                </p>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllFlights;