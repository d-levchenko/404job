'use client';

import { useState } from 'react';
import Link from 'next/link';

import type { Vacancy } from '@/types/vacancyType';

import css from './MyVacanciesList.module.css';

interface MyVacanciesListProps {
  vacancies?: Vacancy[];
}

const INITIAL_VACANCIES_COUNT = 4;

const MyVacanciesList = ({ vacancies = [] }: MyVacanciesListProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleVacancies = showAll
    ? vacancies
    : vacancies.slice(0, INITIAL_VACANCIES_COUNT);

  if (vacancies.length === 0) {
    return (
      <section className={css.wrapper}>
        <h2 className={css.title}>Відкриті вакансії</h2>

        <div className={css.empty}>
          <h3 className={css.emptyTitle}>У вас немає відкритих вакансій</h3>

          <p className={css.emptyText}>Створіть свою першу вакансію</p>

          <Link
            href="/dashboard/employer/create-vacancy"
            className={css.createButton}>
            Створити вакансію
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>Відкриті вакансії</h2>

      <ul className={css.list}>
        {visibleVacancies.map(vacancy => (
          <li key={vacancy._id} className={css.card}>
            <div className={css.cardContent}>
              <div className={css.meta}>
                <span>{vacancy.locationId.name}</span>

                <span>{vacancy.employerId.companyName}</span>
              </div>

              <h3 className={css.vacancyTitle}>{vacancy.title}</h3>

              <p className={css.description}>{vacancy.description}</p>

              <p className={css.salary}>{vacancy.salaryRange}</p>
            </div>

            <div className={css.cardActions}>
              <p className={css.companyName}>
                {vacancy.employerId.companyName}
              </p>

              <button type="button" className={css.closeButton} disabled>
                Закрити вакансію
              </button>
            </div>
          </li>
        ))}
      </ul>

      {vacancies.length > INITIAL_VACANCIES_COUNT && !showAll && (
        <button
          type="button"
          className={css.showMoreButton}
          onClick={() => setShowAll(true)}>
          Показати більше
        </button>
      )}
    </section>
  );
};

export default MyVacanciesList;
