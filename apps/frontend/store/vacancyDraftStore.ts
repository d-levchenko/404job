import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { VacancyFormValues } from '@/types/vacancyType';

export const emptyVacancyValues: VacancyFormValues = {
  title: '',
  description: '',
  requirements: '',
  duties: '',
  plusWillBe: '',
  weOffer: '',
  salaryRange: '',
  experienceLevelId: '',
  employmentTypeId: '',
  industryId: '',
  locationId: '',
  isRemote: false,
};

interface VacancyDraftStore {
  draft: VacancyFormValues;
  hasHydrated: boolean;
  setDraft: (draft: VacancyFormValues) => void;
  clearDraft: () => void;
  setHasHydrated: () => void;
}

export const useVacancyDraftStore = create<VacancyDraftStore>()(
  persist(
    set => ({
      draft: emptyVacancyValues,
      hasHydrated: false,

      setDraft: draft => set({ draft }),

      clearDraft: () => set({ draft: emptyVacancyValues }),

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'create-vacancy-draft',

      partialize: state => ({
        draft: state.draft,
      }),

      onRehydrateStorage: () => {
        return state => {
          state?.setHasHydrated();
        };
      },
    },
  ),
);
