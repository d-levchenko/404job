'use client';
import { initAuth } from '@/lib/authApi';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { setUser } = useAuthStore();

  const { data: user, isFetched } = useQuery({
    queryKey: ['user'],
    queryFn: () => initAuth(),
  });

  useEffect(() => {
    if (isFetched) {
      if (user) {
        setUser(user);
      }
    }
  }, [isFetched, user, setUser]);
  return children;
};

export default AuthProvider;
