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

export const useFiltersStore = create<FiltersStore>((set, get) => ({
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
