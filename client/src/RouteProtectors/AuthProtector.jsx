import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userType')) {
      navigate('/'); // Redirect to homepage if not authenticated
    }
  }, [navigate]); // Only depend on navigate for redirect logic

  return children;
};

export default AuthProtector;