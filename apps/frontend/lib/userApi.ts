import { UpdateProfileData } from '@/types/auth';
import { api } from './api';

export const getCurrentCandidate = async (): Promise<UpdateProfileData> => {
  const { data } = await api.get<UpdateProfileData>('/users');

  return data;
};

export const updateUser = async (body: UpdateProfileData) => {
  const { data } = await api.patch('/users/candidate', body);

  return data;
};
