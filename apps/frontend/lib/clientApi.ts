import { Vacancy } from '@/store/vacancyType';
import { RegisterData } from '@/types/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});

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
  const { data } = await api.post('/auth/register', payload);
  return data;
};
