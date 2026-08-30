import type { Metadata } from 'next';

import CandidateDashboardPage from '@/components/Dashboard/CandidateDashboardPage/CandidateDashboardPage';
import ProfileForm from '@/components/Dashboard/CandidateDashboardPage/ProfileForm/ProfileForm';

export const metadata: Metadata = {
  title: 'Мій профіль | JobSpace',
  description: 'Особистий кабінет кандидата на JobSpace',
};

const user = {
  name: 'TEST',
  githubUrl: 'https://github.com/ivan-alekseev',
  linkedinUrl: 'https://linkedin.com/in/ivan-alekseev',
  behanceUrl: 'https://behance.net/ivan-alekseev',
};

const Page = () => {
  return (
    <>
      <CandidateDashboardPage />
      <ProfileForm user={user} />
    </>
  );
};

export default Page;
