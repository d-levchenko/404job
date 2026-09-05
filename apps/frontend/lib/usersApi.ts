import { api } from './api';
import { AuthUser } from '@/types/auth';

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
  const { data } = await api.get<AuthUser>('/users');

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
