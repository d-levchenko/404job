import EmployerDashboardPage from '@/components/Dashboard/EmployerDashboardPage/EmployerDashboardPage';
import CandidatesList from '@/components/Dashboard/EmployerDashboardPage/CandidatesList/CandidatesList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Кандидати | JobSpace',
  description: 'Перегляд кандидатів в особистому кабінеті JobSpace.',
};

const EmployerCandidatesPage = () => {
  return (
    <EmployerDashboardPage>
      <CandidatesList />
    </EmployerDashboardPage>
  );
};

export default EmployerCandidatesPage;
