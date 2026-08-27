import { FilterOptionType } from '@/types/vacancyType';
import { api } from './api';

export const getFilterOptions = async (type: FilterOptionType) => {
  const { data } = await api.get('/options', {
    params: { type },
  });

  return data;
};
