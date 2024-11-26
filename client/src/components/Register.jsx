import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const { register } = useContext(GeneralContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [homeBranch, setHomeBranch] = useState(''); // You can add homeBranch input here if needed

  const handleRegister = async (e) => {
    e.preventDefault();
    // Pass form data to the register function from context
    await register({ username, email, password, usertype, homeBranch });
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="floatingUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="floatingUsername">Username</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <select
          className="form-select form-select-lg"
          aria-label=".form-select-lg example"
          value={usertype}
          onChange={(e) => setUsertype(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="flight-operator">Flight Operator</option>
        </select>
        <label htmlFor="usertype">User Type</label>
      </div>

      {/* You can add a homeBranch field here if needed */}
      {/* 
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="floatingHomeBranch"
          placeholder="Home Branch"
          value={homeBranch}
          onChange={(e) => setHomeBranch(e.target.value)}
        />
        <label htmlFor="floatingHomeBranch">Home Branch</label>
      </div>
      */}

      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
      <p>
        Already registered?{' '}
        <span onClick={() => setIsLogin(true)}>Login</span>
      </p>
    </form>
  );
};

export default Register;