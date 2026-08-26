import { clientApi } from '@/lib/clientApi';
import type { CandidateProfile, UpdateProfilePayload } from '@/types/user';
import type { Vacancy } from '@/types/vacancy';

export const getProfile = async () => {
  const { data } = await clientApi.get<CandidateProfile>('/users/me');
  return data;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data } = await clientApi.patch<CandidateProfile>(
    '/users/me',
    payload,
  );
  return data;
};

export const getSavedVacancies = async () => {
  const { data } = await clientApi.get<Vacancy[]>('/users/me/favorites');
  return data;
};

export const removeSavedVacancy = async (vacancyId: string) => {
  await clientApi.delete(`/users/me/favorites/${vacancyId}`);
};
