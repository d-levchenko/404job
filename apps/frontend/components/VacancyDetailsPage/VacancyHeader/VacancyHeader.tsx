'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import {
  applyToVacancy,
  addToFavorites,
  removeFromFavorites,
} from '@/lib/vacanciesApi';
import css from './VacancyHeader.module.css';

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

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  const handleApply = async () => {
    if (isApplied || isApplying) return;

    try {
      setIsApplying(true);
      await applyToVacancy(vacancyId);
      setIsApplied(true);
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.status === 401) {
          router.push('/auth/login');
          return;
        }

        if (error.response?.status === 409) {
          setIsApplied(true);
        }
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (isFavoriteLoading) return;

    try {
      setIsFavoriteLoading(true);

      if (isFavorite) {
        await removeFromFavorites(vacancyId);
        setIsFavorite(false);
      } else {
        await addToFavorites(vacancyId);
        setIsFavorite(true);
      }
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.status === 401) {
          router.push('/auth/login');
          return;
        }
      }
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
          {isApplying
            ? 'Відправка...'
            : isApplied
              ? 'Ви відгукнулися'
              : 'Відгукнутись на вакансію'}
        </button>

        <button
          type="button"
          className={`${css.favoriteButton} ${isFavorite ? css.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
          disabled={isFavoriteLoading}
          aria-label={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}>
          <SvgIcon
            name={isFavorite ? 'heartFilled' : 'heart'}
            width={24}
            height={24}
            className={css.heartIcon}
          />
        </button>
      </div>
    </aside>
  );
};

export default VacancyHeader;
