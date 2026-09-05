import { UpdateProfileData } from '@/types/auth';
import { api } from './api';

export const getCurrentCandidate = async (): Promise<UpdateProfileData> => {
  const { data } = await api.get<{ data: UpdateProfileData }>('/users');
  return data.data;
};

export const updateUser = async (body: UpdateProfileData) => {
  const { data } = await api.patch('/users/candidate', body);
  return data;
};
