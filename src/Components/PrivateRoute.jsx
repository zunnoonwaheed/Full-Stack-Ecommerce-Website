import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  
  // Simple token existence check
  const isAuthenticated = () => {
    return !!token; // Returns true if token exists, false otherwise
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;