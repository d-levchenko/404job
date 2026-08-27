import { clientApi } from './clientApi';

export interface EmployerProfile {
  companyName: string;
  websiteUrl: string;
  logo: string;
  description: string;
}

interface CurrentUserResponse {
  data: EmployerProfile;
}

export const getCurrentUser = async (): Promise<EmployerProfile> => {
  const response = await clientApi.get<CurrentUserResponse>('/users');

  return response.data.data;
};

export const updateEmployerProfile = async (
  data: EmployerProfile,
): Promise<EmployerProfile> => {
  const response = await clientApi.patch<CurrentUserResponse>(
    '/users/employer',
    data,
  );

  return response.data.data;
};
