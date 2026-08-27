import { RegisterData } from '@/types/auth';
import { authApi } from './api';
export const registerUser = async (payload: RegisterData) => {
  try {
    const { data } = await authApi.post('/auth/register', payload);
    return data;
  } catch (error) {
    throw error;
  }
};
