import CreateVacancyForm from '@/components/CreateVacancyForm/CreateVacancyForm';
import { getFilterOptions } from '@/lib/optionsApi';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Створення вакансії | JobSpace',
  description: 'Створіть вакансію для роботодавця на JobSpace.',
};

const Page = async () => {
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
    <main>
      <div className={`container ${css.formContainer}`}>
        <h1 className={css.title}>Створення вакансії</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateVacancyForm filters={filters} />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default Page;
