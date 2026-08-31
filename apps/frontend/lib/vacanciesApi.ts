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

export interface VacancyByIdResponse {
  vacancy: Vacancy;
}

export const getHotVacancies = async (limit = 6): Promise<Vacancy[]> => {
  const { data } = await api.get<Vacancy[]>('/vacancies/hot', {
    params: { limit },
  });
  return data;
};

export const getAllVacancies = async (
  params: getAllVacanciesRequest,
): Promise<AllVacancies> => {
  const { data } = await api.get<AllVacancies>('/vacancies/get-all', {
    params,
  });
  return data;
};

export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const { data } = await api.get<VacancyByIdResponse>(`/vacancies/${id}`);
  return data.vacancy;
};

export const addToFavorites = async (vacancyId: string): Promise<void> => {
  await api.post(`/vacancies/${vacancyId}/favorite`);
};

export const removeFromFavorites = async (vacancyId: string): Promise<void> => {
  await api.delete(`/vacancies/${vacancyId}/favorite`);
};

export const applyToVacancy = async (vacancyId: string): Promise<void> => {
  await api.post(`/vacancies/${vacancyId}/apply`);
};
