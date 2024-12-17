import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const StaffRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (user && user.is_staff) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default StaffRoute;
