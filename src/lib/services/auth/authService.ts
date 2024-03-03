import config from '../../../config';
import { secureApi } from '../../hooks/useApi/useApi';
import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse, User } from '../../../types';

export const authService = {
  register: async (registerCredentials: RegisterCredentials): Promise<RegisterResponse> => {
    const { user } = config.urls;
    try {
      const { data } = await secureApi.post(user.create, registerCredentials);
      return { data };
    } catch (error) {
      console.error(error);
      return { error: 'Unknown register error' };
    }
  },
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { user } = config.urls;

    try {
      const { data } = await secureApi.post(user.login, credentials);
      if (data.token) {
        sessionStorage.setItem('user', JSON.stringify(data));
      }
      return { data };
    } catch (error) {
      console.error(error);
      return { error: 'Unknown login error' };
    }
  },
  logout: () => {
    sessionStorage.removeItem('user');
  },
  getCurrentUser: (): User | null => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);

    return null;
  },
};
