import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-flight-requests');
      setRequests(response.data);
    } catch (err) {
      console.error('Error fetching flight requests:', err);
    }
  };

  return (
    <div className="flight-requests-page">
      <h1>Flight Requests</h1>

      {requests.length > 0 ? (
        <div className="flight-requests-list">
          {requests.map((request) => (
            <div className="flight-request-card" key={request._id}>
              <p><b>Flight Name:</b> {request.flightName}</p>
              <p><b>Route:</b> {request.departure} - {request.destination}</p>
              <p><b>Requested By:</b> {request.requestedBy}</p>
              <p><b>Status:</b> {request.status}</p>
              {request.status === 'pending' && (
                <div>
                  <button className="btn btn-primary">Approve</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No flight requests found</p>
      )}
    </div>
  );
};

export default FlightRequests;