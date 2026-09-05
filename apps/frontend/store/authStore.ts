import { AuthUser, UserType } from '@/types/auth';
import { create } from 'zustand';

interface AuthStoreState {
  user: AuthUser | null;
  userType: UserType;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: AuthUser) => void;
  setUserType: (userType: UserType) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsInitialized: (isInitialized: boolean) => void;
  clear: () => void;
  clearAuthStore: () => void;
}

export const useAuthStore = create<AuthStoreState>()(set => ({
  user: null,
  userType: 'candidate',
  isAuthenticated: false,
  isInitialized: false,
  setUser: (user: AuthUser) => set({ user, userType: user.userType }),
  setUserType: (userType: UserType) => set({ userType }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
  clear: () => set({ user: null, isAuthenticated: false }),
  clearAuthStore: () =>
    set({
      user: null,
      userType: 'candidate',
      isAuthenticated: false,
      isInitialized: true,
    }),
}));
