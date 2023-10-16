import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../../services/tokenService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return getCurrentUser() ? (
    <Component {...rest} />
  ) : (
    <Navigate replace to="/login" />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
};

export default ProtectedRoute;
