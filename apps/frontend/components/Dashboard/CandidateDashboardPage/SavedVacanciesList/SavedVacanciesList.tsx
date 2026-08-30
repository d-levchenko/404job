'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  getFavoriteVacancies,
  removeVacancyFromFavorites,
} from '@/lib/vacanciesApi';
import { Vacancy } from '@/types/vacancyType';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import VacanciesMissing from '../VacanciesMissing/VacanciesMissing';

import css from './SavedVacanciesList.module.css';

const SavedVacanciesList = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getFavoriteVacancies();

        setVacancies(data);
      } catch {
        setError('Не вдалося завантажити збережені вакансії');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  const handleVacancyClick = (vacancyId: string) => {
    router.push(`/vacancies/${vacancyId}`);
  };

  const handleRemoveClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    vacancyId: string,
  ) => {
    event.stopPropagation();

    try {
      setRemovingId(vacancyId);

      await removeVacancyFromFavorites(vacancyId);

      setVacancies(prevVacancies =>
        prevVacancies.filter(vacancy => vacancy._id !== vacancyId),
      );
    } catch {
      setError('Не вдалося прибрати вакансію зі збережених');
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading) {
    return <p className={css.message}>Завантаження...</p>;
  }

  if (error) {
    return <p className={css.message}>{error}</p>;
  }

  if (vacancies.length === 0) {
    return <VacanciesMissing />;
  }

  return (
    <ul className={css.list}>
      {vacancies.map(vacancy => (
        <li
          key={vacancy._id}
          className={css.card}
          onClick={() => handleVacancyClick(vacancy._id)}
        >
          <div className={css.top}>
            <Image
              src="/images/emptyImg.jpg"
              alt={vacancy.employerId.companyName}
              width={157}
              height={67}
              className={css.image}
            />

            <div className={css.info}>
              <div className={css.meta}>
                <div className={css.location}>
                  <SvgIcon name="locationOn" width={24} height={24} />
                  <p>{vacancy.locationId.name}</p>
                </div>

                <p className={css.company}>{vacancy.employerId.companyName}</p>
              </div>

              <h3 className={css.title}>{vacancy.title}</h3>
            </div>
          </div>

          <p className={css.description}>{vacancy.description}</p>

          <div className={css.bottom}>
            {vacancy.salaryRange.length > 0 && (
              <div className={css.salary}>
                <SvgIcon name="payments" width={24} height={24} />
                <p>{vacancy.salaryRange}</p>
              </div>
            )}

            <button
              className={css.removeButton}
              type="button"
              onClick={event => handleRemoveClick(event, vacancy._id)}
              disabled={removingId === vacancy._id}
            >
              {removingId === vacancy._id
                ? 'Видаляємо...'
                : 'Прибрати зі збережених'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SavedVacanciesList;