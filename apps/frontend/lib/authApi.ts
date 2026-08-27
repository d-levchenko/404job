import { RegisterData } from '@/types/auth';
import { api } from './api';

export const registerUser = async (payload: RegisterData) => {
  try {
    const { data } = await api.post('api/auth/register', payload);
    return data;
  } catch (error) {
    throw error;
  }
};
