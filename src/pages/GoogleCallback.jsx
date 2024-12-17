import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      setToken(token);
      navigate('/dashboard'); 
    } else {
      navigate('/login');
    }
  }, [location, navigate, setToken]);

  return <div>Processing authentication...</div>;
};

export default GoogleCallback;
