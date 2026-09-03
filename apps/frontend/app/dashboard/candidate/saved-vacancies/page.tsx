import type { Metadata } from 'next';

import CandidateDashboardPage from '@/components/Dashboard/CandidateDashboardPage/CandidateDashboardPage';
import SavedVacanciesList from '@/components/Dashboard/CandidateDashboardPage/SavedVacanciesList/SavedVacanciesList';

export const metadata: Metadata = {
  title: 'Збережені вакансії | JobSpace',
  description: 'Збережені вакансії кандидата на JobSpace',
};

const SavedVacanciesPage = () => {
  return (
    <CandidateDashboardPage>
      <SavedVacanciesList />
    </CandidateDashboardPage>
  );
};

export default SavedVacanciesPage;
