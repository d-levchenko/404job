import { UpdateProfileData } from '@/types/auth';
import { api } from './api';

export const updateUser = async (body: UpdateProfileData) => {
  const { data } = await api.patch('/users/candidate', body);

  return data;
};
