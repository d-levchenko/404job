'use client';

import { getCurrentUser } from '@/lib/usersApi';
import { useAuthStore } from '@/store/authStore';
import React, { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setIsAuthenticated, setIsInitialized, clearAuthStore } =
    useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();

        if (user) {
          setUser(user);
          setIsAuthenticated(true);
          setIsInitialized(true);
        } else {
          clearAuthStore();
        }
      } catch {
        clearAuthStore();
      }
    };

    fetchUser();
  }, [setUser, setIsAuthenticated, setIsInitialized, clearAuthStore]);

  return <>{children}</>;
};

export default AuthProvider;
