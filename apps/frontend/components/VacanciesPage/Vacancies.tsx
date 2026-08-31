'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllVacancies } from '@/lib/vacanciesApi';
import { useFiltersStore } from '@/store/filtersStore';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import VacanciesList from './VacanciesList/VacanciesList';
import RequestReturnedNothing from './RequestReturnedNothing/RequestReturnedNothing';
import Search from './Search/Search';
import { FiltersOptions } from './FiltersPanel/FilterFields';
import MobTabFilters from './FiltersPanel/MobTabFilters/MobTabFilter';

import css from './Vacancies.module.css';
import VacancySkeleton from './VacanciesList/VacancySkeleton/VacancySkeleton';

interface VacanciesProps {
  filters: FiltersOptions;
}

const Vacancies = ({ filters }: VacanciesProps) => {
  const searchParams = useSearchParams();
  const setFromParams = useFiltersStore(state => state.setFromParams);

  useEffect(() => {
    setFromParams(searchParams);
  }, [searchParams, setFromParams]);

  const filterParams = {
    perPage: Number(searchParams.get('perPage') || 8),
    search: searchParams.get('search') || undefined,
    industry: searchParams.getAll('industry'),
    experience: searchParams.getAll('experience'),
    location: searchParams.get('location'),
    employmentType: searchParams.getAll('employmentType'),
    isRemote:
      searchParams.get('isRemote') === null
        ? null
        : searchParams.get('isRemote') === 'true',
  };

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['vacancies', filterParams],
      queryFn: ({ pageParam }) =>
        getAllVacancies({ ...filterParams, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      placeholderData: prev => prev,
    });

  const vacancies = data?.pages.flatMap(page => page.vacancies) ?? [];
  const meta = data?.pages.at(-1);
  const hasResults = vacancies.length > 0;
  const totalDisplayed = vacancies.length;
  const totalVacancies = data?.pages.at(0)?.totalVacancies ?? 0;

  const adjustedMeta = meta
    ? {
        ...meta,
        totalVacancies: totalVacancies,
        perPage: totalDisplayed,
      }
    : undefined;

  return (
    <div className="desktop:flex desktop:gap-8 items-start">
      <FiltersPanel meta={adjustedMeta} filters={filters} />
      <MobTabFilters meta={adjustedMeta} filters={filters} />

      <div className="flex-1 w-full items-center">
        <Search />

        {isFetching && (
          <ul className="flex flex-col gap-6 mb-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <VacancySkeleton key={index} />
            ))}
          </ul>
        )}

        {hasResults ? (
          <>
            <VacanciesList vacancies={vacancies} />

            {hasNextPage && (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={css.button}>
                {isFetchingNextPage ? 'Завантаження...' : 'Показати більше'}
              </button>
            )}
          </>
        ) : (
          !isFetching && <RequestReturnedNothing />
        )}
      </div>
    </div>
  );
};

export default Vacancies;
