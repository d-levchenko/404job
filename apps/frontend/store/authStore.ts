import { CandidateData, EmployerData, UserType } from '@/types/auth';
import { create } from 'zustand';

interface AuthStoreState {
  candidate: CandidateData | null;
  employer: EmployerData | null;
  userType: UserType | '';
  isAuthenticated: boolean;
}
interface AuthStoreAction {
  setCandidate: (data: CandidateData) => void;
  setEmployer: (data: EmployerData) => void;
  setUserType: (type: UserType) => void;
  setIsAuthenticated: (state: boolean) => void;
  clearAuthStore: () => void;
}

const initialState: AuthStoreState = {
  candidate: null,
  employer: null,
  userType: '',
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStoreState & AuthStoreAction>()(set => ({
  ...initialState,
  setCandidate: candidate =>
    set({ candidate, isAuthenticated: true, userType: 'candidate' }),
  setEmployer: employer =>
    set({ employer, isAuthenticated: true, userType: 'employer' }),
  setUserType: userType => set({ userType }),
  setIsAuthenticated: (state: boolean) => ({ state }),
  clearAuthStore: () => set({ ...initialState }),
}));
