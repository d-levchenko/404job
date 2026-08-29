'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import css from './VacancyHeader.module.css';

interface VacancyHeaderProps {
  vacancyId: string;
  location?: string;
  salaryRange?: string;
  createdAt?: string;
  isFavoriteInitial?: boolean;
  isAuthenticated?: boolean;
}

const VacancyHeader: React.FC<VacancyHeaderProps> = ({
  vacancyId,
  location,
  salaryRange,
  createdAt,
  isFavoriteInitial = false,
  isAuthenticated = true, // для тесту тримаємо true
}) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (isApplied || isApplying) return;

    try {
      setIsApplying(true);
      console.log('Відправка резюме на вакансію:', vacancyId);

      // Імітуємо очікування відповіді від сервера (700 мс)
      await new Promise(resolve => setTimeout(resolve, 700));

      setIsApplied(true);
      console.log('Успішно відгукнулись на вакансію:', vacancyId);
    } catch (error) {
      console.error('Помилка при відгуку:', error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setIsFavorite(prev => !prev);
    console.log('Зміна статусу обраного для:', vacancyId);
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
