import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const ProtectedRoute = ({ path, children }) => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Route path={path}>{children}</Route>;
  } else {
    return <Navigate to="/login" />;
  }
};

export { ProtectedRoute };
