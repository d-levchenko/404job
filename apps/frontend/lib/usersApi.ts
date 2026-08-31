import { api } from './api';

export const getMe = async () => {
  const response = await api.get('/users');
  return response.data;
};
