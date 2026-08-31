import { AuthUser, UserType } from '@/types/auth';
import { create } from 'zustand';

interface AuthStoreState {
  user: AuthUser | null;
  userType: UserType | '';
  isAuthenticated: boolean;
}
interface AuthStoreAction {
  setUser: (data: AuthUser) => void;
  setUserType: (type: UserType) => void;
  setIsAuthenticated: (state: boolean) => void;
  clearAuthStore: () => void;
}

const initialState: AuthStoreState = {
  user: null,
  userType: '',
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStoreState & AuthStoreAction>()(set => ({
  ...initialState,
  setUser: user => set({ user, isAuthenticated: true }),
  setUserType: userType => set({ userType }),
  setIsAuthenticated: (state: boolean) => ({ state }),
  clearAuthStore: () => set({ ...initialState }),
}));
