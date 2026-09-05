'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import {
  applyToVacancy,
  addToFavorites,
  removeFromFavorites,
} from '@/lib/vacanciesApi';
import css from './VacancyHeader.module.css';
import { useAuthStore } from '@/store/authStore';

interface VacancyHeaderProps {
  vacancyId: string;
  location?: string;
  salaryRange?: string;
  createdAt?: string;
  isFavoriteInitial?: boolean;
}

interface ApiErrorResponse {
  message?: string;
}

const VacancyHeader: React.FC<VacancyHeaderProps> = ({
  vacancyId,
  location,
  salaryRange,
  createdAt,
  isFavoriteInitial = false,
}) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteInitial);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState<boolean>(false);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const user = useAuthStore(state => state.user);

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  const redirectToLogin = () => {
    toast.error('Будь ласка, увійдіть у систему');
    router.push('/auth/login');
  };

  const handleApply = async () => {
    if (isApplied || isApplying) return;
    if (user?.userType === 'employer') {
      toast.error('Відгук на вакансію може зробити тільки кандидат');
      return;
    }

    try {
      setIsApplying(true);
      await applyToVacancy(vacancyId);
      setIsApplied(true);
      toast.success('Ви успішно відгукнулися на вакансію!');
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          redirectToLogin();
          return;
        }

        if (error.response?.status === 409) {
          setIsApplied(true);
          toast('Ви вже відгукнулися на цю вакансію раніше', { icon: 'ℹ️' });
          return;
        }

        toast.error(
          error.response?.data?.message ||
            'Не вдалося відгукнутися на вакансію',
        );
        return;
      }

      toast.error('Виникла непередбачена помилка');
    } finally {
      setIsApplying(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (isFavoriteLoading) return;
    if (user?.userType === 'employer') {
      toast.error('Додати вакансію в обране може зробити тільки кандидат');
      return;
    }

    try {
      setIsFavoriteLoading(true);

      if (isFavorite) {
        await removeFromFavorites(vacancyId);
        setIsFavorite(false);
        toast.success('Вакансію видалено з обраного');
      } else {
        await addToFavorites(vacancyId);
        setIsFavorite(true);
        toast.success('Вакансію додано в обране');
      }
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          redirectToLogin();
          return;
        }

        toast.error(
          error.response?.data?.message || 'Помилка оновлення обраного',
        );
        return;
      }

      toast.error('Виникла непередбачена помилка');
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <aside className={css.card}>
      <div className={css.infoList}>
        {location && (
          <div className={css.infoItem}>
            <SvgIcon
              name="locationOn"
              width={32}
              height={32}
              className={css.icon}
            />
            <span className={css.infoText}>{location}</span>
          </div>
        )}

        {salaryRange && (
          <div className={css.infoItem}>
            <SvgIcon
              name="payments"
              width={32}
              height={32}
              className={css.icon}
            />
            <span className={css.infoText}>{salaryRange}</span>
          </div>
        )}

        {formattedDate && (
          <div className={css.infoItem}>
            <SvgIcon
              name="dateRange"
              width={32}
              height={32}
              className={css.icon}
            />
            <span className={css.infoText}>{formattedDate}</span>
          </div>
        )}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.applyButton}
          onClick={handleApply}
          disabled={isApplying || isApplied}>
          {isApplying ? (
            <span className={css.buttonLoader}>Відправка...</span>
          ) : isApplied ? (
            'Ви відгукнулися'
          ) : (
            'Відгукнутись на вакансію'
          )}
        </button>

        <button
          type="button"
          className={`${css.favoriteButton} ${isFavorite ? css.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
          disabled={isFavoriteLoading}
          aria-label={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}>
          {isFavoriteLoading ? (
            <span className={css.iconSpinner} />
          ) : (
            <SvgIcon
              name={isFavorite ? 'heartFilled' : 'heart'}
              width={24}
              height={24}
              className={css.heartIcon}
            />
          )}
        </button>
      </div>
    </aside>
  );
};

export default VacancyHeader;
