import axios from 'axios';

export const clientApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});
