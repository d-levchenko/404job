'use client';

import { create } from 'zustand';

export interface VacancyFiltersState {
  search: string;
  industry: string[];
  experience: string[];
  location: string | null;
  employmentType: string[];
  isRemote: boolean | null;
}

type MultiSelectKey = 'industry' | 'experience' | 'employmentType';

interface FiltersStore extends VacancyFiltersState {
  setSearch: (value: string) => void;
  toggleValue: (key: MultiSelectKey, value: string) => void;
  setLocation: (value: string | null) => void;
  setIsRemote: (value: boolean | null) => void;
  setFromParams: (params: URLSearchParams) => void;
  reset: () => void;
}

const initialState: VacancyFiltersState = {
  search: '',
  industry: [],
  experience: [],
  location: null,
  employmentType: [],
  isRemote: null,
};

export const useFiltersStore = create<FiltersStore>()((set, get) => ({
  ...initialState,

  setSearch: search => set({ search }),

  toggleValue: (key, value) => {
    const current = get()[key];
    set({
      [key]: current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value],
    });
  },

  setLocation: location => set({ location }),
  setIsRemote: isRemote => set({ isRemote }),

  setFromParams: params =>
    set({
      search: params.get('search') ?? '',
      industry: params.getAll('industry'),
      experience: params.getAll('experience'),
      location: params.get('location'),
      employmentType: params.getAll('employmentType'),
      isRemote:
        params.get('isRemote') === null
          ? null
          : params.get('isRemote') === 'true',
    }),

  reset: () => set(initialState),
}));

export const buildFiltersSearchParams = (state: VacancyFiltersState) => {
  const params = new URLSearchParams();

  if (state.search) params.set('search', state.search);
  state.industry.forEach(id => params.append('industry', id));
  state.experience.forEach(id => params.append('experience', id));
  if (state.location) params.set('location', state.location);
  state.employmentType.forEach(id => params.append('employmentType', id));
  if (state.isRemote !== null) params.set('isRemote', String(state.isRemote));

  return params;
};
