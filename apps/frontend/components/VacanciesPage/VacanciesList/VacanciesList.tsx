'use client';

import { Vacancy } from '@/types/vacancyType';
import { useRouter } from 'next/navigation';

import css from './VacanciesList.module.css';
import VacancyCard from './VacancyCard/VacancyCard';

interface VacanciesListProps {
  vacancies: Vacancy[];
  onRemoveFromSaved?: (vacancyId: string) => void;
  removingId?: string | null;
}

const VacanciesList = ({
  vacancies,
  onRemoveFromSaved,
  removingId,
}: VacanciesListProps) => {
  const router = useRouter();

  const handleVacancyClick = (vacancyId: Vacancy['_id']) => {
    router.push(`/vacancies/${vacancyId}`);
  };

  return (
    <ul className={css.list}>
      {vacancies.map(vacancy => (
        <VacancyCard
          key={vacancy._id}
          vacancy={vacancy}
          handleVacancyClick={handleVacancyClick}
          onRemoveFromSaved={onRemoveFromSaved}
          removingId={removingId}
          css={css}
        />
      ))}
    </ul>
  );
};

export default VacanciesList;
