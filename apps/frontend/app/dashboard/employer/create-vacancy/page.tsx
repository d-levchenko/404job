import CreateVacancyForm from '@/components/CreateVacancyForm/CreateVacancyForm';
import { getFilterOptions } from '@/lib/optionsApi';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
  noop,
} from '@tanstack/react-query';

import css from './page.module.css';

const Page = async () => {
  const queryClient = new QueryClient();

  const [industries, locations, experienceLevels, employmentTypes] =
    await Promise.allSettled([
      queryClient
        .query({
          queryKey: ['filters', 'industries'],
          queryFn: () => getFilterOptions('industries'),
        })
        .catch(noop),
      queryClient.query({
        queryKey: ['filters', 'locations'],
        queryFn: () => getFilterOptions('locations'),
      }),
      queryClient.query({
        queryKey: ['filters', 'experienceLevels'],
        queryFn: () => getFilterOptions('experienceLevels'),
      }),
      queryClient.query({
        queryKey: ['filters', 'employmentTypes'],
        queryFn: () => getFilterOptions('employmentTypes'),
      }),
    ]);

  const filters = {
    industries,
    locations,
    experienceLevels,
    employmentTypes,
  };
  return (
    <main>
      <div className="container">
        <h1 className={css.title}>Створення вакансії</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateVacancyForm filters={filters} />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default Page;
