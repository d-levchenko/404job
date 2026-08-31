import { AuthUser, LoginData, RegisterData } from '@/types/auth';
import { api } from './api';
import { getMe } from './usersApi';

export const registerUser = async (payload: RegisterData) => {
  try {
    const { data } = await api.post('auth/register', payload);
    return data;
  } catch (error) {
    throw error;
  }
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
