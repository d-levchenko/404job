import { getFilterOptions } from '@/lib/clientApi';
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

  await Promise.all([
    queryClient
      .query({
        queryKey: ['filters'],
        queryFn: () => getFilterOptions('industries'),
      })
      .catch(noop),
    queryClient.query({
      queryKey: ['filters'],
      queryFn: () => getFilterOptions('locations'),
    }),
    queryClient.query({
      queryKey: ['filters'],
      queryFn: () => getFilterOptions('experienceLevels'),
    }),
    queryClient.query({
      queryKey: ['filters'],
      queryFn: () => getFilterOptions('employmentTypes'),
    }),
  ]);

  return (
    <main className="bg-(--color-scheme-1-background) px-5 py-12">
      <div className=" w-full max-w-93.75 mx-auto">
        <h1 className={css.title}>Вакансії</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Vacancies />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default VacanciesPage;
