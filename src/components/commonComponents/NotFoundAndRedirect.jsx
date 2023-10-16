import { Navigate } from "react-router-dom";
import React from "react";

const NotFoundAndRedirect = () => {
  return <Navigate to="/" />;
};

export default NotFoundAndRedirect;
