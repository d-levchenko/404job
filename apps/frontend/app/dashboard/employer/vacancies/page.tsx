import type { Metadata } from 'next';

import EmployerDashboardPage from '@/components/Dashboard/EmployerDashboardPage/EmployerDashboardPage';
import MyVacanciesList from '@/components/Dashboard/EmployerDashboardPage/MyVacanciesList/MyVacanciesList';

export const metadata: Metadata = {
  title: 'Відкриті вакансії | JobSpace',
  description:
    'Переглядайте та керуйте відкритими вакансіями вашої компанії в особистому кабінеті JobSpace.',
};

const EmployerVacanciesPage = () => {
  return (
    <EmployerDashboardPage>
      <MyVacanciesList />
    </EmployerDashboardPage>
  );
};

export default EmployerVacanciesPage;
