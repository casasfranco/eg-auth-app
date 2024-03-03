import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: JSX.Element;
  inverse?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, inverse = false }) => {
  const { isAuthenticated } = useAuth();

  if (inverse) {
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
