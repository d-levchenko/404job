import { Vacancy } from '@/types/vacancyType';
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
