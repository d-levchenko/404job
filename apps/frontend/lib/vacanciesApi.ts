import { AllVacancies, Vacancy, VacancyFormValues } from '@/types/vacancyType';

import { api } from './api';

export interface getAllVacanciesRequest {
  page?: number;
  perPage?: number;
  search?: string;
  industry?: string | string[] | null;
  experience?: string | string[] | null;
  location?: string | null;
  employmentType?: string | string[] | null;
  isRemote?: boolean | null;
}

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

export const getAllVacancies = async (
  params: getAllVacanciesRequest,
): Promise<AllVacancies> => {
  try {
    const { data } = await api.get<AllVacancies>('/vacancies/get-all', {
      params,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const createVacancy = async (
  body: VacancyFormValues,
): Promise<Vacancy> => {
  try {
    const { data } = await api.post<Vacancy>('/vacancies/create-vacancy', body);
    return data;
  } catch (error) {
    throw error;
  }
};
