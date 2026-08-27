import { AllVacancies } from '@/types/vacancyType';

import css from './VacanciesList.module.css';

interface VacanciesListProps {
  vacancies: AllVacancies;
}

const VacanciesList = ({ vacancies: { vacancies } }: VacanciesListProps) => {
  return (
    <ul className="flex flex-col gap-6">
      {vacancies.map(vacancy => (
        <li
          key={vacancy._id}
          className="rounded-4xl p-6 max-w-83.75 w-full bg-(--color-scheme-4-foreground) font-[var(--font-family)] font-normal leading-normal">
          <p className={css.location}>{vacancy.locationId.name}</p>
          <p className="text-[14px]">{vacancy.employerId.companyName}</p>

          <h2 className={css.title}>{vacancy.title}</h2>
          <p className={css.description}>{vacancy.description}</p>

          <p className={css.salary}>{vacancy.salaryRange}</p>
        </li>
      ))}
    </ul>
  );
};

export default VacanciesList;
