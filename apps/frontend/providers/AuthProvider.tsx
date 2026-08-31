'use client';
import { initAuth } from '@/lib/authApi';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { setCandidate, setEmployer } = useAuthStore();

  const {
    data: user,

    isFetched,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => initAuth(),
  });

  useEffect(() => {
    if (isFetched) {
      if (user?.userType === 'candidate') {
        setCandidate(user);
      } else if (user?.userType === 'employer') {
        setEmployer(user);
      }
    }
  }, [isFetched, user, setCandidate, setEmployer]);
  return children;
};

export default AuthProvider;
