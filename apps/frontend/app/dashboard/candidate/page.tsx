import type { Metadata } from 'next';

import CandidateDashboardPage from '@/components/Dashboard/CandidateDashboardPage/CandidateDashboardPage';
import ProfileForm from '@/components/Dashboard/CandidateDashboardPage/ProfileForm/ProfileForm';

export const metadata: Metadata = {
  title: 'Мій профіль | JobSpace',
  description: 'Особистий кабінет кандидата на JobSpace',
};

const Page = () => {
  return (
    <CandidateDashboardPage>
      <ProfileForm />
    </CandidateDashboardPage>
  );
};

export default Page;
