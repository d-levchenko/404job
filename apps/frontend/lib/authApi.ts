import { AuthUser, LoginData, RegisterData } from '@/types/auth';
import { api } from './api';
import axios from 'axios';

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
