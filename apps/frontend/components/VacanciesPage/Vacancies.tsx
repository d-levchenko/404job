'use client';

import { useSearchParams } from 'next/navigation';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import VacanciesList from './VacanciesList/VacanciesList';
import { useQuery } from '@tanstack/react-query';
import { getAllVacancies } from '@/lib/clientApi';
import RequestReturnedNothing from './RequestReturnedNothing/RequestReturnedNothing';

const Vacancies = () => {
  const searchParams = useSearchParams();

  const params = {
    page: Number(searchParams.get('page') || 1),
    industry: searchParams.get('industry'),
    experience: searchParams.get('experience'),
    location: searchParams.get('location'),
    isRemote:
      searchParams.get('isRemote') === null
        ? null
        : searchParams.get('isRemote') === 'true',
  };

  const { data } = useQuery({
    queryKey: ['vacancies', params],
    queryFn: () => getAllVacancies(params),
  });

  return (
    <>
      <FiltersPanel params={data} />

      {data ? <VacanciesList vacancies={data} /> : <RequestReturnedNothing />}
    </>
  );
};

export default Vacancies;
