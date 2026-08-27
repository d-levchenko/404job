import { Vacancy } from '@/store/vacancyType';
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
