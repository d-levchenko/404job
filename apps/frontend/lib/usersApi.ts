import { api } from './api';
import axios from 'axios';

export const getMe = async () => {
  const response = await api.get('/users');

  return response.data;
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

export const getCurrentUser = async (): Promise<EmployerProfile> => {
  const response = await axios.get<CurrentUserResponse>('/api/users');

  return response.data.data;
};

export const updateEmployerProfile = async (
  data: FormData,
): Promise<EmployerProfile> => {
  const response = await axios.patch<CurrentUserResponse>(
    '/api/users/employer',
    data,
  );

  return response.data.data;
};
