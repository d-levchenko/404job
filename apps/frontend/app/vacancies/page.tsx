import { getFilterOptions } from '@/lib/optionsApi';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Vacancies from '@/components/VacanciesPage/Vacancies';
import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';

import css from './page.module.css';
import ForEmployers from '@/components/HomePage/ForEmployers/ForEmployers';

export const dynamic = 'force-dynamic';

const VacanciesPage = async () => {
  const queryClient = new QueryClient();

  const [industries, locations, experienceLevels, employmentTypes] =
    await Promise.allSettled([
      queryClient.query({
        queryKey: ['industries'],
        queryFn: () => getFilterOptions('industries'),
      }),

      queryClient.query({
        queryKey: ['locations'],
        queryFn: () => getFilterOptions('locations'),
      }),

      queryClient.query({
        queryKey: ['experienceLevels'],
        queryFn: () => getFilterOptions('experienceLevels'),
      }),

      queryClient.query({
        queryKey: ['employmentTypes'],
        queryFn: () => getFilterOptions('employmentTypes'),
      }),
    ]);

  const filters = {
    industries: industries.status === 'fulfilled' ? industries.value : [],

    locations: locations.status === 'fulfilled' ? locations.value : [],

    experienceLevels:
      experienceLevels.status === 'fulfilled' ? experienceLevels.value : [],

    employmentTypes:
      employmentTypes.status === 'fulfilled' ? employmentTypes.value : [],
  };

  return (
    <main className="bg-(--color-scheme-1-background) py-12">
      <div className="container">
        <h1 className={css.title}>Вакансії</h1>

        <Suspense fallback={<Loader />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Vacancies filters={filters} />
          </HydrationBoundary>
        </Suspense>

        <ForEmployers />
      </div>
    </main>
  );
};

export default VacanciesPage;
