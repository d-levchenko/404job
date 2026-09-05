'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserType } from '@/types/auth';

const dashboardPathByType: Record<UserType, string> = {
  candidate: '/dashboard/candidate',
  employer: '/dashboard/employer',
};

export const useDashboardGuard = (requiredType: UserType) => {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      router.replace('/auth/login');
    } else if (user.userType !== requiredType) {
      router.replace(dashboardPathByType[user.userType]);
    }
  }, [isInitialized, user, requiredType, router]);

  const isAllowed = isInitialized && user?.userType === requiredType;

  return { isAllowed };
};
