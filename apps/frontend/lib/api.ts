import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
  paramsSerializer: { indexes: null },
});

let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isAuthEndpoint = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh',
    ].some(path => originalRequest?.url?.includes(path));

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        refreshPromise ??= api.post('/auth/refresh').finally(() => {
          refreshPromise = null;
        });

        await refreshPromise;

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuthStore();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
