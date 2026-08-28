'use client';

import { create } from 'zustand';

export interface VacancyFiltersState {
  search: string;
  industry: string | null;
  experience: string | null;
  location: string | null;
  employmentType: string | null;
  isRemote: boolean | null;
}

type SingleSelectKey =
  'industry' | 'experience' | 'location' | 'employmentType';

interface FiltersStore extends VacancyFiltersState {
  setSearch: (value: string) => void;
  toggleValue: (key: SingleSelectKey, value: string) => void;
  setIsRemote: (value: boolean | null) => void;
  setFromParams: (params: URLSearchParams) => void;
  reset: () => void;
}

const initialState: VacancyFiltersState = {
  search: '',
  industry: null,
  experience: null,
  location: null,
  employmentType: null,
  isRemote: null,
};

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  ...initialState,

  setSearch: search => set({ search }),

  toggleValue: (key, value) =>
    set({ [key]: get()[key] === value ? null : value }),

  setIsRemote: isRemote => set({ isRemote }),

  setFromParams: params =>
    set({
      search: params.get('search') ?? '',
      industry: params.get('industry'),
      experience: params.get('experience'),
      location: params.get('location'),
      employmentType: params.get('employmentType'),
      isRemote:
        params.get('isRemote') === null
          ? null
          : params.get('isRemote') === 'true',
    }),

  reset: () => set(initialState),
}));
