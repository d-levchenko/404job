'use client';

import { refreshSession } from '@/lib/authApi';
import { getCurrentUser } from '@/lib/usersApi';
import { useAuthStore } from '@/store/authStore';
import React, { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setIsAuthenticated, clearAuthStore } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refreshSession();
        const user = await getCurrentUser();

        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          clearAuthStore();
        }
      } catch {
        clearAuthStore();
      }
    };

    fetchUser();
  }, [setUser, setIsAuthenticated, clearAuthStore]);

  return <>{children}</>;
};

export default AuthProvider;
