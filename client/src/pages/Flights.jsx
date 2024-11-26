import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Flights = () => {
  const [userDetails, setUserDetails] = useState();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchFlights();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:6001/fetch-user/${id}`);
      setUserDetails(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching user data');
      setLoading(false);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-flights');
      setFlights(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error fetching flight data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading while fetching data
  }

  return (
    <div className="allFlightsPage">
      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}

      {userDetails ? (
        <>
          {userDetails.approval === 'not-approved' ? (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. It needs approval from the administrator. Kindly be patient!</p>
            </div>
          ) : userDetails.approval === 'approved' ? (
            <>
              <h1>All Flights</h1>
              <div className="allFlights">
                {flights.length > 0 ? (
                  flights
                    .filter((flight) => flight.flightName === localStorage.getItem('username'))
                    .map((Flight) => (
                      <div className="allFlights-Flight" key={Flight._id}>
                        <p><b>_id:</b> {Flight._id}</p>
                        <span>
                          <p><b>Flight Id:</b> {Flight.flightId}</p>
                          <p><b>Flight name:</b> {Flight.flightName}</p>
                        </span>
                        <span>
                          <p><b>Starting station:</b> {Flight.origin}</p>
                          <p><b>Departure time:</b> {Flight.departureTime}</p>
                        </span>
                        <span>
                          <p><b>Destination:</b> {Flight.destination}</p>
                          <p><b>Arrival time:</b> {Flight.arrivalTime}</p>
                        </span>
                        <span>
                          <p><b>Base price:</b> {Flight.basePrice}</p>
                          <p><b>Total seats:</b> {Flight.totalSeats}</p>
                        </span>
                        <div>
                          <button className="btn btn-primary" onClick={() => navigate(`/edit-flight/${Flight._id}`)}>
                            Edit details
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No flights available for this user.</p> // Display message if no flights
                )}
              </div>
            </>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Flights;