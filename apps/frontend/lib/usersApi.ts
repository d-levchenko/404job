import axios from 'axios';

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
  const response = await axios.get<CurrentUserResponse>('/api/users');

  return response.data.data;
};

export const updateEmployerProfile = async (
  data: EmployerProfile,
): Promise<EmployerProfile> => {
  const response = await axios.patch<CurrentUserResponse>(
    '/api/users/employer',
    data,
  );

  return response.data.data;
};
