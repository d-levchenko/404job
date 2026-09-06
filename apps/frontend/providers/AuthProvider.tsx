'use client';

import { refreshSession } from '@/lib/authApi';
import { getCurrentUser } from '@/lib/usersApi';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setIsAuthenticated, setIsInitialized, clearAuthStore } =
    useAuthStore();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      await refreshSession();
      return getCurrentUser();
    },
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      clearAuthStore();
    }

    setIsInitialized(true);
  }, [
    user,
    isLoading,
    isError,
    setUser,
    setIsAuthenticated,
    setIsInitialized,
    clearAuthStore,
  ]);

  return <>{children}</>;
};

export default AuthProvider;
