'use client';

import { useAuthStore } from '@/store/authStore';
import ForEmployers from '../ForEmployers/ForEmployers';

interface ForEmployersGateProps {
  className?: string;
}

const ForEmployersGate = ({ className }: ForEmployersGateProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const userType = useAuthStore(state => state.userType);
  const isLoggedCandidate = isAuthenticated && userType === 'candidate';

  if (isLoggedCandidate) return null;

  return (
    <section className={className}>
      <ForEmployers />
    </section>
  );
};

export default ForEmployersGate;
