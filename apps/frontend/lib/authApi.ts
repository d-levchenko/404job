import { AuthUser, LoginData, RegisterData } from '@/types/auth';
import { api } from './api';

export const registerUser = async (payload: RegisterData) => {
  try {
    const { data } = await api.post('auth/register', payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (payload: LoginData) => {
  const { data } = await api.post<AuthUser>('auth/login', payload);
  return data;
};
