import EmployerDashboardPage from '@/components/Dashboard/EmployerDashboardPage/EmployerDashboardPage';
import MyVacanciesList from '@/components/Dashboard/EmployerDashboardPage/MyVacanciesList/MyVacanciesList';

const EmployerVacanciesPage = () => {
  return (
    <EmployerDashboardPage>
      <MyVacanciesList />
    </EmployerDashboardPage>
  );
};

export default EmployerVacanciesPage;
