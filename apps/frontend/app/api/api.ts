import axios from 'axios';

const baseURL =
  typeof window === 'undefined'
    ? process.env.INTERNAL_API_URL || 'http://localhost:4000/api'
    : '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
});
