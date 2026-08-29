import { AllVacancies } from '@/types/vacancyType';

import css from './VacanciesList.module.css';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import Image from 'next/image';

interface VacanciesListProps {
  vacancies: AllVacancies;
}

const VacanciesList = ({ vacancies: { vacancies } }: VacanciesListProps) => {
  return (
    <ul className="flex flex-col gap-6">
      {vacancies.map(vacancy => (
        <li
          key={vacancy._id}
          className="rounded-4xl p-6 max-w-83.75 w-full bg-(--color-scheme-4-foreground) font-(--font-family) font-normal leading-normal
          md:max-w-3xl xl:max-w-243.75">
          <div className="md:flex justify-between flex-row-reverse items-center mb-4">
            <Image
              src="/images/emptyImg.jpg"
              alt={vacancy.employerId.companyName}
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
        </li>
      ))}
    </ul>
  );
};

export default VacanciesList;
