'use client';

import { useEffect, type ReactNode } from 'react';

import { getCurrentAuthUser } from '@/lib/authApi';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore(state => state.setUser);
  const setLoading = useAuthStore(state => state.setLoading);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentAuthUser();

        setUser(user);
      } catch (error) {
        console.error('Failed to load current user:', error);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, [setUser, setLoading]);

  return children;
};

export default AuthProvider;
