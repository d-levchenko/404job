import { CandidateProfile } from '@/types/userType';
import { api } from './api';
import toast from 'react-hot-toast';

export const updateUser = async (body: CandidateProfile) => {
  const { data } = await api.patch('/users/candidate', body);
  return data;
};
