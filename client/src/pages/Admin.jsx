import React, { useEffect, useState, useRef } from "react";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

  // State for user data
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  // Ref to check if the component is mounted
  const isMounted = useRef(true);

  // Effect to fetch data on mount
  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false; // Cleanup to prevent state updates on unmounted components
    };
  }, []);

  // Safe state update utility
  const safeSetState = (setter) => (value) => {
    if (isMounted.current) setter(value);
  };

  // Fetch data for users, bookings, and flights
  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:6001/fetch-users");
      safeSetState(setUserCount)(usersResponse.data.length - 1);
      safeSetState(setUsers)(
        usersResponse.data.filter((user) => user.approval === "not-approved")
      );

      const bookingsResponse = await axios.get(
        "http://localhost:6001/fetch-bookings"
      );
      safeSetState(setBookingCount)(bookingsResponse.data.length);

      const flightsResponse = await axios.get(
        "http://localhost:6001/fetch-flights"
      );
      safeSetState(setFlightsCount)(flightsResponse.data.length);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Approve operator
  const approveRequest = async (id) => {
    try {
      await axios.post("http://localhost:6001/approve-operator", { id });
      alert("Operator approved!");
      fetchData(); // Refresh data after approval
    } catch (error) {
      console.error("Error approving operator:", error.message);
    }
  };

  // Reject operator
  const rejectRequest = async (id) => {
    try {
      await axios.post("http://localhost:6001/reject-operator", { id });
      alert("Operator rejected!");
      fetchData(); // Refresh data after rejection
    } catch (error) {
      console.error("Error rejecting operator:", error.message);
    }
  };

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-cards">
          <div className="card admin-card users-card">
            <h4>Users</h4>
            <p>{userCount}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/all-users")}
            >
              View all
            </button>
          </div>

          <div className="card admin-card transactions-card">
            <h4>Bookings</h4>
            <p>{bookingCount}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/all-bookings")}
            >
              View all
            </button>
          </div>

          <div className="card admin-card deposits-card">
            <h4>Flights</h4>
            <p>{flightsCount}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/all-flights")}
            >
              View all
            </button>
          </div>
        </div>

        <div className="admin-requests-container">
          <h3>New Operator Applications</h3>
          <div className="admin-requests">
            {users.length === 0 ? (
              <p>No new requests...</p>
            ) : (
              users.map((user) => (
                <div className="admin-request" key={user._id}>
                  <span>
                    <b>Operator name:</b> {user.username}
                  </span>
                  <span>
                    <b>Operator email:</b> {user.email}
                  </span>
                  <div className="admin-request-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => approveRequest(user._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => rejectRequest(user._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;