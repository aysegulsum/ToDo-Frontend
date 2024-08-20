import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute = () => {
  const authentication = localStorage.getItem("isAuthenticated");
  if (authentication === "true") {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
