'use client';

import Link from 'next/link';
import Image from 'next/image';
import NoImage from '@/assets/no-image.svg';
import LocationIcon from '@/assets/location-on.svg';
import PaymentsIcon from '@/assets/payments.svg';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { closeVacancy, getMyVacancies } from '@/lib/vacanciesApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

import css from './MyVacanciesList.module.css';

const VACANCIES_PER_PAGE = 4;

interface VacancyLogoProps {
  logo?: string;
  companyName: string;
}

const VacancyLogo = ({ logo, companyName }: VacancyLogoProps) => {
  const [imageError, setImageError] = useState(false);

  if (!logo || imageError) {
    return (
      <div className={css.companyLogoPlaceholder}>
        <NoImage className={css.noImageIcon} />
      </div>
    );
  }

  return (
    <Image
      src={logo}
      alt={`${companyName} logo`}
      width={157}
      height={67}
      className={css.companyLogo}
      onError={() => setImageError(true)}
    />
  );
};

const MyVacanciesList = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['myVacancies', 'active'],

    queryFn: ({ pageParam }) =>
      getMyVacancies({
        page: pageParam,
        perPage: VACANCIES_PER_PAGE,
        status: 'active',
      }),

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

  const closeMutation = useMutation({
    mutationFn: closeVacancy,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['myVacancies', 'active'],
      });

      toast.success('Вакансію успішно закрито');
    },

    onError: error => {
      console.error('Failed to close vacancy:', error);

      toast.error('Не вдалося закрити вакансію. Спробуйте ще раз.');
    },
  });

  const vacancies = data?.pages.flatMap(page => page.vacancies) ?? [];

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (isError) {
    return <p>Не вдалося завантажити вакансії</p>;
  }

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
        {vacancies.map(vacancy => {
          const isClosing =
            closeMutation.isPending && closeMutation.variables === vacancy._id;

          return (
            <li key={vacancy._id} className={css.card}>
              <div className={css.cardContent}>
                <div className={css.companyMobile}>
                  <VacancyLogo
                    logo={vacancy.employerId.logo}
                    companyName={vacancy.employerId.companyName}
                  />
                </div>

                <div className={css.meta}>
                  <span className={css.location}>
                    <LocationIcon className={css.locationIcon} />

                    <span>
                      {vacancy.locationId.name}
                      {vacancy.isRemote && ' / Віддалено'}
                    </span>
                  </span>

                  <span className={css.metaCompany}>
                    {vacancy.employerId.companyName}
                  </span>
                </div>

                <h3 className={css.vacancyTitle}>{vacancy.title}</h3>

                <p className={css.description}>{vacancy.description}</p>

                <p className={css.salary}>
                  <PaymentsIcon className={css.salaryIcon} />

                  <span>{vacancy.salaryRange}</span>
                </p>
              </div>

              <div className={css.cardActions}>
                <div className={css.companyDesktop}>
                  <VacancyLogo
                    logo={vacancy.employerId.logo}
                    companyName={vacancy.employerId.companyName}
                  />
                </div>

                <button
                  type="button"
                  className={css.closeButton}
                  onClick={() => closeMutation.mutate(vacancy._id)}
                  disabled={isClosing}>
                  {isClosing ? 'Закриття...' : 'Закрити вакансію'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          className={css.showMoreButton}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Завантаження...' : 'Показати більше'}
        </button>
      )}
    </section>
  );
};

export default MyVacanciesList;
