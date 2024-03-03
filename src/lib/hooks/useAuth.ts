import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/auth/authService';
import { DecodedToken } from '../../types';

const isTokenExpired = (token: string): boolean => {
  const decoded: DecodedToken = jwtDecode(token);
  const currentDate = new Date();
  return decoded.exp * 1000 < currentDate.getTime();
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { getCurrentUser, logout } = authService;

  useEffect(() => {
    const user = getCurrentUser();
    const token = user?.token;
    if (user && token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      logout();
    }
  }, [getCurrentUser, logout]);

  return { isAuthenticated };
};
