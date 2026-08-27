'use client';
import {
  BlossomCarousel,
  BlossomDots,
  BlossomNext,
  BlossomPrev,
} from '@blossom-carousel/react';
import css from './HotVacancies.module.css';
import { useQuery } from '@tanstack/react-query';
import { getHotVacancies } from '@/lib/clientApi';
import Image from 'next/image';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

function HotVacancies() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotVacancies'],
    queryFn: () => getHotVacancies(),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження вакансій</p>;
  return (
    <section className={css.hotSection}>
      <div className={css.container}>
        <BlossomCarousel repeat={true} id="gallery" className={css.carousel}>
          {data?.map(vacancy => (
            <li key={vacancy._id} data-blossom-slide className={css.slide}>
              <SvgIcon name="noImage" />
              <p>{vacancy.title}</p>
            </li>
          ))}
        </BlossomCarousel>
        <BlossomDots for="gallery" className={css.dots} />
        <div className="controls">
          <BlossomPrev for="gallery" />
          <BlossomNext for="gallery" />
        </div>
      </div>
    </section>
  );
}

export default HotVacancies;
