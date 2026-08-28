import { getFilterOptions } from '@/lib/optionsApi';
import {
  dehydrate,
  HydrationBoundary,
  noop,
  QueryClient,
} from '@tanstack/react-query';

import css from './page.module.css';
import Vacancies from '@/components/VacanciesPage/Vacancies';

const VacanciesPage = async () => {
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
    <main className="bg-(--color-scheme-1-background) px-5 py-12">
      <div className="container">
        <h1 className={css.title}>Вакансії</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Vacancies filters={filters} />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default VacanciesPage;
