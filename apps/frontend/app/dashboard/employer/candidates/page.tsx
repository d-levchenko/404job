import EmployerDashboardPage from '@/components/Dashboard/EmployerDashboardPage/EmployerDashboardPage';
import CandidatesList from '@/components/Dashboard/EmployerDashboardPage/CandidatesList/CandidatesList';

const EmployerCandidatesPage = () => {
  return (
    <EmployerDashboardPage>
      <CandidatesList />
    </EmployerDashboardPage>
  );
};

export default EmployerCandidatesPage;
