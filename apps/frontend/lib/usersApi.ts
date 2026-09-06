import { api } from './api';
import { AuthUser } from '@/types/auth';
import { UpdateProfileData } from '@/types/auth';

export const updateUser = async (body: UpdateProfileData) => {
  const { data } = await api.patch('/users/candidate', body);

  return data;
};

export interface EmployerProfile {
  companyName: string;
  websiteUrl: string;
  logo: string;
  description: string;
}

interface CurrentUserResponse {
  data: EmployerProfile;
}

export const getCurrentUser = async (): Promise<AuthUser> => {
  const { data } = await api.get<AuthUser>('/users/me');

  return data;
};

export const updateEmployerProfile = async (
  data: FormData,
): Promise<EmployerProfile> => {
  const response = await api.patch<CurrentUserResponse>(
    '/users/employer',
    data,
  );

  return response.data.data;
};
