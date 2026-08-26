import { Suspense } from 'react';
import CandidateDashboardPage from '@/components/Dashboard/CandidateDashboardPage/CandidateDashboardPage';

const Page = () => {
  return (
    <Suspense>
      <CandidateDashboardPage />
    </Suspense>
  );
};

export default Page;
