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

export interface GetMyVacanciesRequest {
  page?: number;
  perPage?: number;
  status?: 'active' | 'closed';
}

export interface VacancyByIdResponse {
  vacancy: Vacancy;
  similarVacancies?: Vacancy[];
}

export interface SavedVacancies {
  page: number;
  perPage: number;
  totalPages: number;
  totalSavedVacancies: number;
  savedVacancies: Vacancy[];
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
  const { data } = await api.get<AllVacancies>('/vacancies', {
    params,
  });

  return data;
};

export const getVacancyById = async (
  id: string,
): Promise<VacancyByIdResponse> => {
  const { data } = await api.get<VacancyByIdResponse>(`/vacancies/${id}`);

  return data;
};

export const getFavoriteVacancies = async (): Promise<SavedVacancies> => {
  const { data } = await api.get<SavedVacancies>('/vacancies/favorite', {
    params: { perPage: 100 },
  });

  return data;
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

export const createVacancy = async (
  body: VacancyFormValues,
): Promise<Vacancy> => {
  const { data } = await api.post<Vacancy>('/vacancies/create-vacancy', body);

  return data;
};

export const getMyVacancies = async (
  params: GetMyVacanciesRequest,
): Promise<AllVacancies> => {
  const { data } = await api.get<AllVacancies>('/vacancies/my/vacancies', {
    params,
  });

  return data;
};

export const closeVacancy = async (vacancyId: string): Promise<Vacancy> => {
  const { data } = await api.patch<Vacancy>(`/vacancies/${vacancyId}/close`);

  return data;
};
