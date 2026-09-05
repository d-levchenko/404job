import { AuthUser, LoginData, RegisterData } from '@/types/auth';
import { api } from './api';
import { getMe } from './usersApi';
import axios from 'axios';

export const registerUser = async (payload: RegisterData) => {
  const { data } = await axios.post<AuthUser>('/api/auth/register', payload);

  return data;
};

export const loginUser = async (payload: LoginData): Promise<AuthUser> => {
  const { data } = await api.post<AuthUser>('auth/login', payload);
  return data;
};
export const refreshSession = async () => {
  const response = await api.post('/auth/refresh');
  return response;
};
export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const initAuth = async (): Promise<AuthUser | null> => {
  try {
    await refreshSession();
    const user = await getMe();
    return user;
  } catch {
    return null;
  }
};

export const getCurrentAuthUser = async (): Promise<AuthUser | null> => {
  try {
    const response = await axios.get<{ data: AuthUser }>('/api/users');

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};
