'use client';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { Vacancy } from '@/types/vacancyType';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface VacancyCardProps {
  vacancy: Vacancy;
  handleVacancyClick: (vacancyId: Vacancy['_id']) => void;
  onRemoveFromSaved?: (vacancyId: string) => void;
  removingId?: string | null;
  css: { readonly [key: string]: string };
}

const VacancyCard = ({
  vacancy,
  handleVacancyClick,
  onRemoveFromSaved,
  removingId,
  css,
}: VacancyCardProps) => {
  const cardRef = useRef<HTMLLIElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;

    const maxTilt = 8;
    setRotateX(-normalizedY * maxTilt);
    setRotateY(normalizedX * maxTilt);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <li
      ref={cardRef}
      onClick={() => handleVacancyClick(vacancy._id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="rounded-4xl p-6 max-w-83.75 w-full bg-(--color-scheme-4-foreground) font-(--font-family) font-normal leading-normal md:max-w-3xl xl:max-w-243.75
      cursor-pointer hover:bg-(--color-scheme-4-background) hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] vacancyItem will-change-transform">
      <div className="md:flex justify-between flex-row-reverse items-center mb-4">
        <Image
          src="/images/emptyImg.jpg"
          alt={vacancy.employerId.companyName || `${vacancy.title} image`}
          width={157}
          height={67}
          className="mb-4 rounded-3xl md:mb-0"
        />

        <div>
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <SvgIcon name="locationOn" width={24} height={24} />
              <p className={css.location}>{vacancy.locationId.name}</p>
            </div>

            <p className="text-[14px]">{vacancy.employerId.companyName}</p>
          </div>

          <h2 className={css.title}>{vacancy.title}</h2>
        </div>
      </div>

      <p className={css.description}>{vacancy.description}</p>

      {vacancy.salaryRange.length > 0 && (
        <div className="flex gap-2 items-center">
          <SvgIcon name="payments" width={24} height={24} />
          <p className={css.salary}>{vacancy.salaryRange}</p>
        </div>
      )}

      {onRemoveFromSaved && (
        <button
          type="button"
          className={css.removeButton}
          disabled={removingId === vacancy._id}
          onClick={event => {
            event.stopPropagation();
            onRemoveFromSaved(vacancy._id);
          }}>
          {removingId === vacancy._id
            ? 'Видаляємо...'
            : 'Прибрати зі збережених'}
        </button>
      )}
    </li>
  );
};

export default VacancyCard;
