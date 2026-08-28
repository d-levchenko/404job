'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { getAllVacancies } from '@/lib/vacanciesApi';
import LocationPin from '@/assets/location-pin.svg';
import Payments from '@/assets/payments.svg';

import css from './SimilarVacanciesSection.module.css';

type SimilarVacanciesSectionProps = {
  industryId: string;
  excludeVacancyId: string;
};

const SimilarVacanciesSection = ({
  industryId,
  excludeVacancyId,
}: SimilarVacanciesSectionProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['similarVacancies', industryId],
    queryFn: () => getAllVacancies({ industry: industryId, perPage: 5 }),
    enabled: Boolean(industryId),
  });

  const similarVacancies =
    data?.vacancies
      .filter(vacancy => vacancy._id !== excludeVacancyId)
      .slice(0, 4) ?? [];

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження вакансій</p>;
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
                    <LocationPin width={20} height={20} aria-hidden="true" />
                    {vacancy.locationId?.name}
                  </p>
                </div>

                <p className={css.vacancyTitle}>{vacancy.title}</p>

                {vacancy.salaryRange && (
                  <p className={css.salary}>
                    <Payments width={20} height={20} aria-hidden="true" />
                    {vacancy.salaryRange}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SimilarVacanciesSection;
