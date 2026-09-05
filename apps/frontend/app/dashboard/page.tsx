'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';
import { dashboardPathByType } from '@/hooks/useDashboardGuard';
import Loader from '@/components/Loader/Loader';

const DashboardPage = () => {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      router.replace('/auth/login');
    } else {
      router.replace(dashboardPathByType[user.userType]);
    }
  }, [isInitialized, user, router]);

  return <Loader />;
};

export default DashboardPage;
