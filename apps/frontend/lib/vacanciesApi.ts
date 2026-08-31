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

interface FavoriteVacanciesResponse {
  message: string;
  savedVacancies: Vacancy[];
}

export const getFavoriteVacancies = async (): Promise<Vacancy[]> => {
  try {
    const { data } = await api.get<Vacancy[]>('/vacancies/favorite');

    return data;
  } catch (error) {
    throw error;
  }
};

export const removeVacancyFromFavorites = async (
  vacancyId: string,
): Promise<FavoriteVacanciesResponse> => {
  try {
    const { data } = await api.delete<FavoriteVacanciesResponse>(
      `/vacancies/${vacancyId}/favorite`,
    );

    return data;
  } catch (error) {
    throw error;
  }
};
