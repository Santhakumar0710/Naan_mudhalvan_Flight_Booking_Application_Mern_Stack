import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/allUsers.css';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users with error handling and loading state
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="all-users-page">
        <h2>All Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="all-users">
              <h3>Customers</h3>
              {users
                .filter((user) => user.usertype === 'customer')
                .map((user) => {
                  return (
                    <div className="user" key={user._id}>
                      <p>
                        <b>UserId:</b> {user._id}
                      </p>
                      <p>
                        <b>Username:</b> {user.username}
                      </p>
                      <p>
                        <b>Email:</b> {user.email}
                      </p>
                    </div>
                  );
                })}
            </div>

            <h3>Flight Operators</h3>
            <div className="all-users">
              {users
                .filter((user) => user.usertype === 'flight-operator')
                .map((user) => {
                  return (
                    <div className="user" key={user._id}>
                      <p>
                        <b>Id:</b> {user._id}
                      </p>
                      <p>
                        <b>Flight Name:</b> {user.username}
                      </p>
                      <p>
                        <b>Email:</b> {user.email}
                      </p>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllUsers;