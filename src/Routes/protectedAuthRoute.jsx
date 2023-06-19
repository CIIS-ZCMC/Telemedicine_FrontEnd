import { Navigate, useLocation, Outlet } from "react-router-dom";
import Loader from "../Pages/Loader";
import PropTypes from "prop-types";

const ProtectedAuthRoute = ({ user }) => {
  const location = useLocation();

  if (!user || user.loggedIn === undefined) {
    return <Loader />;
  }

  if (user.loggedIn === true) {
    return <Navigate to="/h" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

ProtectedAuthRoute.propTypes = {
  user: PropTypes.object,
};

export default ProtectedAuthRoute;
