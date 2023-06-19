import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../Pages/Loader";
import PropTypes from "prop-types";

const ProtectedRoute = ({ user }) => {
  const location = useLocation();

  if (user === null) {
    return <Loader />;
  }

  if (user !== null && user.loggedIn === true) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
};

export default ProtectedRoute;
