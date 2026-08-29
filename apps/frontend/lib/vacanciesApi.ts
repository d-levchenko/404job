import { AllVacancies, Vacancy } from '@/types/vacancyType';

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
interface GetMyVacanciesRequest {
  page?: number;
  perPage?: number;
  status?: 'active' | 'closed';
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

export const getMyVacancies = async (
  params: GetMyVacanciesRequest,
): Promise<AllVacancies> => {
  const { data } = await api.get<AllVacancies>('/vacancies/my', {
    params,
  });

  return data;
};

export const closeVacancy = async (vacancyId: string): Promise<Vacancy> => {
  const { data } = await api.patch<Vacancy>(`/vacancies/${vacancyId}/close`);

  return data;
};
