import React, { useState } from 'react';
import '../styles/Authenticate.css';
import Login from '../components/Login';
import Register from '../components/Register';

const Authenticate = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="AuthenticatePage">
      
      {/* Conditionally render Login or Register based on the state */}
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
      
      {/* Optional: Add a toggle button if you want to switch between login/register */}
      <div className="toggleForm">
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>

    </div>
  );
}

export default Authenticate;