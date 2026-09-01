'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader/Loader';
import VacanciesList from '@/components/VacanciesPage/VacanciesList/VacanciesList';
import { getFavoriteVacancies, removeFromFavorites } from '@/lib/vacanciesApi';

import VacanciesMissing from '../VacanciesMissing/VacanciesMissing';

const SavedVacanciesList = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ['savedVacancies'],
    queryFn: getFavoriteVacancies,
  });

  const remove = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedVacancies'] });
    },
    onError: () => {
      toast.error('Не вдалося прибрати вакансію зі збережених');
    },
  });

  if (isPending) return <Loader />;

  if (isError) {
    return <p>Не вдалося завантажити збережені вакансії</p>;
  }

  if (!data.savedVacancies.length) {
    return <VacanciesMissing />;
  }

  return (
    <VacanciesList
      vacancies={data.savedVacancies}
      onRemoveFromSaved={remove.mutate}
      removingId={remove.isPending ? remove.variables : null}
    />
  );
};

export default SavedVacanciesList;
