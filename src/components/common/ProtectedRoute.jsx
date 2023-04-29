import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ path, element, ...rest }) => {
  const currentUser = getCurrentUser();
  return currentUser ? (
    <Route path={path} element={element} {...rest} />
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default ProtectedRoute;
