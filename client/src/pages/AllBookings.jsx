import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Ref to check if the component is mounted
  const isMounted = useRef(true);

  // Effect to fetch bookings on mount
  useEffect(() => {
    fetchBookings();
    return () => {
      isMounted.current = false; // Cleanup to prevent state updates on unmounted components
    };
  }, []);

  // Safe state update utility
  const safeSetState = (setter) => (value) => {
    if (isMounted.current) setter(value);
  };

  // Fetch bookings from the server
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-bookings");
      safeSetState(setBookings)(response.data.reverse());
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  // Cancel a booking
  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
      alert("Ticket cancelled!");
      fetchBookings(); // Refresh the bookings list after cancellation
    } catch (error) {
      console.error("Error cancelling ticket:", error.message);
    }
  };

  return (
    <div className="user-bookingsPage">
      <h1>Bookings</h1>

      <div className="user-bookings">
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          bookings.map((booking) => (
            <div className="user-booking" key={booking._id}>
              <p>
                <b>Booking ID:</b> {booking._id}
              </p>
              <span>
                <p>
                  <b>Mobile:</b> {booking.mobile}
                </p>
                <p>
                  <b>Email:</b> {booking.email}
                </p>
              </span>
              <span>
                <p>
                  <b>Flight Id:</b> {booking.flightId}
                </p>
                <p>
                  <b>Flight name:</b> {booking.flightName}
                </p>
              </span>
              <span>
                <p>
                  <b>On-boarding:</b> {booking.departure}
                </p>
                <p>
                  <b>Destination:</b> {booking.destination}
                </p>
              </span>
              <span>
                <div>
                  <p>
                    <b>Passengers:</b>
                  </p>
                  <ol>
                    {booking.passengers.map((passenger, i) => (
                      <li key={i}>
                        <p>
                          <b>Name:</b> {passenger.name}, <b>Age:</b>{" "}
                          {passenger.age}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
                {booking.bookingStatus === "confirmed" && (
                  <p>
                    <b>Seats:</b> {booking.seats}
                  </p>
                )}
              </span>
              <span>
                <p>
                  <b>Booking date:</b> {booking.bookingDate.slice(0, 10)}
                </p>
                <p>
                  <b>Journey date:</b> {booking.journeyDate.slice(0, 10)}
                </p>
              </span>
              <span>
                <p>
                  <b>Journey Time:</b> {booking.journeyTime}
                </p>
                <p>
                  <b>Total price:</b> {booking.totalPrice}
                </p>
              </span>
              <p
                style={
                  booking.bookingStatus === "cancelled"
                    ? { color: "red" }
                    : undefined
                }
              >
                <b>Booking status:</b> {booking.bookingStatus}
              </p>
              {booking.bookingStatus === "confirmed" && (
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => cancelTicket(booking._id)}
                  >
                    Cancel Ticket
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllBookings;