import CreateVacancyForm from '@/components/CreateVacancyForm/CreateVacancyForm';
import { getFilterOptions } from '@/lib/optionsApi';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import css from './page.module.css';

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
