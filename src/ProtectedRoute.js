import { Navigate } from "react-router-dom";
import React from "react";
function ProtectedRoute({ element: Component, isAuthenticated, ...rest }) {
  return isAuthenticated === "true" ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;
