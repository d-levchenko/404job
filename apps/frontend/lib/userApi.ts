import { CandidateProfile } from '@/types/userType';
import { api } from './api';

export const getCurrentCandidate = async (): Promise<CandidateProfile> => {
  const { data } = await api.get<{ data: CandidateProfile }>('/users');
  return data.data;
};

export const updateUser = async (body: CandidateProfile) => {
  const { data } = await api.patch('/users/candidate', body);
  return data;
};
