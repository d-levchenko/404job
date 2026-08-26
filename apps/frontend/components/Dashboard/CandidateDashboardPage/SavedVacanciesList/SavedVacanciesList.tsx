'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSavedVacancies, removeSavedVacancy } from '@/lib/api/profile';
import VacanciesMissing from '../VacanciesMissing/VacanciesMissing';
import SavedVacancyCard from './SavedVacancyCard/SavedVacancyCard';

const SavedVacanciesList = () => {
  const queryClient = useQueryClient();

  const {
    data: vacancies,
    isPending,
    isError,
  } = useQuery({ queryKey: ['savedVacancies'], queryFn: getSavedVacancies });

  const mutation = useMutation({
    mutationFn: removeSavedVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedVacancies'] });
    },
    onError: () => {
      toast.error('Не вдалося прибрати вакансію зі збережених');
    },
  });

  return (
    <div className="flex w-full flex-col gap-4 desktop:min-w-0 desktop:flex-1">
      <h2 className="text-[18px]/[27px] font-bold text-black desktop:text-[20px]/[30px]">
        Збережені вакансії
      </h2>

      {isPending && (
        <span
          role="status"
          aria-label="Завантаження вакансій"
          className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent"
        />
      )}

      {isError && (
        <p className="text-[14px]/[21px] text-error desktop:text-[16px]/[24px]">
          Не вдалося завантажити збережені вакансії
        </p>
      )}

      {vacancies &&
        (vacancies.length === 0 ? (
          <VacanciesMissing
            title="У вас ще немає збережених вакансій"
            description="Збережіть свою першу вакансію, щоб не загубити їх в майбутньому"
            buttonLabel="До вакансій"
            href="/vacancies"
          />
        ) : (
          <ul className="flex flex-col gap-6">
            {vacancies.map(vacancy => (
              <SavedVacancyCard
                key={vacancy._id}
                vacancy={vacancy}
                isRemoving={
                  mutation.isPending && mutation.variables === vacancy._id
                }
                onRemove={mutation.mutate}
              />
            ))}
          </ul>
        ))}
    </div>
  );
};

export default SavedVacanciesList;
