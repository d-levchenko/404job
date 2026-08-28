'use client';

import { useSearchParams } from 'next/navigation';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import VacanciesList from './VacanciesList/VacanciesList';
import { useQuery } from '@tanstack/react-query';
import { getAllVacancies } from '@/lib/vacanciesApi';
import RequestReturnedNothing from './RequestReturnedNothing/RequestReturnedNothing';
import {
  EmploymentType,
  ExperienceLevel,
  Industry,
  Location,
} from '@/types/vacancyType';

interface VacanciesProps {
  filters: {
    industries: PromiseSettledResult<Industry[]>;
    locations: PromiseSettledResult<Location[]>;
    experienceLevels: PromiseSettledResult<ExperienceLevel[]>;
    employmentTypes: PromiseSettledResult<EmploymentType[]>;
  };
}

const Vacancies = ({ filters }: VacanciesProps) => {
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
      <FiltersPanel params={data} filters={filters} />

      {data ? <VacanciesList vacancies={data} /> : <RequestReturnedNothing />}
    </>
  );
};

export default Vacancies;
