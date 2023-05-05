import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/tokenService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = getCurrentUser();
  return currentUser ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;
