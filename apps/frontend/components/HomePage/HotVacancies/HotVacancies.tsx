'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useQuery } from '@tanstack/react-query';

import css from './HotVacancies.module.css';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { getHotVacancies } from '@/lib/vacanciesApi';

function HotVacancies() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    duration: 25,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotVacancies'],
    queryFn: () => getHotVacancies(),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження вакансій</p>;

  return (
    <section className={css.hotSection}>
      <div className={css.viewport} ref={emblaRef}>
        <div className={css.container}>
          {data?.map(vacancy => (
            <div key={vacancy._id} className={css.slide}>
              <SvgIcon name="noImage" />
              <div className={css.titleWrapper}>
                <p>{vacancy.employerId.companyName}</p>
                <p>{vacancy.locationId.name}</p>
              </div>
              <p className={css.title}>{vacancy.title}</p>
              <p>{vacancy.salaryRange}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={css.wrapper}>
        <div className={css.dots}>
          {data?.map((vacancy, index) => (
            <button
              key={vacancy._id}
              type="button"
              onClick={() => scrollTo(index)}
              className={`${css.dot} ${index === selectedIndex ? css.dotActive : ''}`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>

        <div className={css.controls}>
          <button
            type="button"
            onClick={scrollPrev}
            className={css.navButton}
            aria-label="Попередні">
            ←
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className={css.navButton}
            aria-label="Наступні">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default HotVacancies;
