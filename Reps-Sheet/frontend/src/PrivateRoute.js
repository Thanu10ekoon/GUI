// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("userName");

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/GUI/login" replace />;
  }

  // If logged in, render the child component (like Dashboard, Record, etc.)
  return children;
}

export default PrivateRoute;
