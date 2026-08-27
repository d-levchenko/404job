import { AllVacancies, FilterOptionType, Vacancy } from '@/types/vacancyType';

import { api } from './api';

interface getAllVacanciesRequest {
  page?: number;
  perPage?: number;
  search?: string;
  industry?: string | null;
  experience?: string | null;
  location?: string | null;
  employmentType?: string | null;
  isRemote?: boolean | null;
}

interface getHotVacanciesRequest {
  limit: number;
}

export const getHotVacancies = async ({
  limit = 6,
}: getHotVacanciesRequest): Promise<Vacancy[]> => {
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

export const getFilterOptions = async (type: FilterOptionType) => {
  const { data } = await api.get('/options', {
    params: { type },
  });

  return data;
};
