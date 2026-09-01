import type { Metadata } from 'next';

import EmployerDashboardPage from '@/components/Dashboard/EmployerDashboardPage/EmployerDashboardPage';
import CompanyProfileForm from '@/components/Dashboard/EmployerDashboardPage/CompanyProfileForm/CompanyProfileForm';

export const metadata: Metadata = {
  title: 'Профіль компанії | JobSpace',
  description:
    'Керуйте профілем компанії, інформацією про роботодавця та вакансіями в особистому кабінеті JobSpace.',
};

const EmployerPage = () => {
  return (
    <EmployerDashboardPage>
      <CompanyProfileForm />
    </EmployerDashboardPage>
  );
};

export default EmployerPage;
