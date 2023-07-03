import { useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isloggedIn, redirectPath = '/', showInfoTooltip }) => {

  useEffect(() => {
    if (isloggedIn === false) {
      showInfoTooltip();
    }

  }, [isloggedIn, showInfoTooltip])

  if (isloggedIn === false) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
