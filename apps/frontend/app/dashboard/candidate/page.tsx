import type { Metadata } from 'next';

import CandidateDashboardPage from '@/components/Dashboard/CandidateDashboardPage/CandidateDashboardPage';

export const metadata: Metadata = {
  title: 'Мій профіль | JobSpace',
  description: 'Особистий кабінет кандидата на JobSpace',
};

const Page = () => {
  return <CandidateDashboardPage />;
};

export default Page;
