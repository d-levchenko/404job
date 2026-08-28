import Link from 'next/link';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

import css from './SimilarVacanciesSection.module.css';

type SimilarVacancy = {
  _id: string;
  title: string;
  salaryRange?: string;
  employerId: {
    companyName: string;
    logo?: string;
  };
  locationId?: {
    name: string;
  };
};

type SimilarVacanciesSectionProps = {
  similarVacancies: SimilarVacancy[];
};

const SimilarVacanciesSection = ({
  similarVacancies,
}: SimilarVacanciesSectionProps) => {
  if (similarVacancies.length === 0) return null;

  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>Схожі вакансії</h2>

      <ul className={css.list}>
        {similarVacancies.map(vacancy => (
          <li key={vacancy._id}>
            <Link href={`/vacancies/${vacancy._id}`} className={css.card}>
              <div className={css.imageWrapper}>
                <SvgIcon name="noImage" width={64} height={64} />
              </div>

              <div className={css.header}>
                <div className={css.topRow}>
                  <p className={css.companyName}>
                    {vacancy.employerId.companyName}
                  </p>
                  <p className={css.location}>
                    <SvgIcon name="locationOn" width={20} height={20} />
                    {vacancy.locationId?.name}
                  </p>
                </div>

                <p className={css.vacancyTitle}>{vacancy.title}</p>

                <div className={css.salary}>
                  {vacancy.salaryRange && (
                    <>
                      <SvgIcon name="payments" width={20} height={20} />
                      <span>{vacancy.salaryRange}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SimilarVacanciesSection;
