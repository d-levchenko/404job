'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAllVacancies } from '@/lib/vacanciesApi';
import { useFiltersStore } from '@/store/filtersStore';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import VacanciesList from './VacanciesList/VacanciesList';
import RequestReturnedNothing from './RequestReturnedNothing/RequestReturnedNothing';
import Search from './Search/Search';
import { FiltersOptions } from './FiltersPanel/FilterFields';
import MobTabFilters from './FiltersPanel/MobTabFilters/MobTabFilter';

interface VacanciesProps {
  filters: FiltersOptions;
}

const Vacancies = ({ filters }: VacanciesProps) => {
  const searchParams = useSearchParams();
  const setFromParams = useFiltersStore(state => state.setFromParams);

  useEffect(() => {
    setFromParams(searchParams);
  }, [searchParams, setFromParams]);

  const params = {
    page: Number(searchParams.get('page') || 1),
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

  const { data, isFetching } = useQuery({
    queryKey: ['vacancies', params],
    queryFn: () => getAllVacancies(params),
    placeholderData: prev => prev,
  });

  const hasResults = !!data && data.vacancies.length > 0;

  return (
    <div className="desktop:flex desktop:gap-8 items-start">
      <FiltersPanel meta={data} filters={filters} />
      <MobTabFilters meta={data} filters={filters} />

      <div className="flex-1 w-full">
        <Search />

        {hasResults ? (
          <VacanciesList vacancies={data} />
        ) : (
          !isFetching && <RequestReturnedNothing />
        )}
      </div>
    </div>
  );
};

export default Vacancies;
