'use client';

import { Vacancy } from '@/types/vacancyType';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import css from './VacanciesList.module.css';

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

  const handleVacancyClick = (vacancyId: string) => {
    router.push(`/vacancies/${vacancyId}`);
  };

  return (
    <ul className={css.list}>
      {vacancies.map(vacancy => (
        <li
          key={vacancy._id}
          onClick={() => handleVacancyClick(vacancy._id)}
          className="rounded-4xl p-6 max-w-83.75 w-full bg-(--color-scheme-4-foreground) font-(--font-family) font-normal leading-normal
          md:max-w-3xl xl:max-w-243.75 cursor-pointer hover:bg-(--color-scheme-4-background) transition-(--transition)
          hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:scale-[1.01] vacancyItem">
          <div className="md:flex justify-between flex-row-reverse items-center mb-4">
            <Image
              src="/images/emptyImg.jpg"
              alt={vacancy.employerId.companyName || `${vacancy.title} image`}
              width={157}
              height={67}
              className="mb-4 rounded-3xl md:mb-0"
            />

            <div>
              <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <SvgIcon name="locationOn" width={24} height={24} />
                  <p className={css.location}>{vacancy.locationId.name}</p>
                </div>

                <p className="text-[14px]">{vacancy.employerId.companyName}</p>
              </div>

              <h2 className={css.title}>{vacancy.title}</h2>
            </div>
          </div>

          <p className={css.description}>{vacancy.description}</p>

          {vacancy.salaryRange.length > 0 && (
            <div className="flex gap-2 items-center">
              <SvgIcon name="payments" width={24} height={24} />
              <p className={css.salary}>{vacancy.salaryRange}</p>
            </div>
          )}

          {onRemoveFromSaved && (
            <button
              type="button"
              className={css.removeButton}
              disabled={removingId === vacancy._id}
              onClick={event => {
                event.stopPropagation();
                onRemoveFromSaved(vacancy._id);
              }}>
              {removingId === vacancy._id
                ? 'Видаляємо...'
                : 'Прибрати зі збережених'}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default VacanciesList;
