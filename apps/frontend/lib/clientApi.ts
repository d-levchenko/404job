import { Vacancy } from '@/types/vacancyType';
import { RegisterData } from '@/types/auth';
import { api } from './api';

export const getHotVacancies = async (limit = 6): Promise<Vacancy[]> => {
  try {
    const { data } = await api.get<Vacancy[]>('/vacancies/hot', {
      params: { limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (payload: RegisterData) => {
  const { data } = await api.post('/api/auth/register', payload);
  return data;
};
