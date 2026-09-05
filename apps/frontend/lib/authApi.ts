import { AuthUser, LoginData, RegisterData } from '@/types/auth';
import { api } from './api';
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
  await api.post('/auth/logout');
};
