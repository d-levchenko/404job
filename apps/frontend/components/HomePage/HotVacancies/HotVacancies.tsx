'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useQuery } from '@tanstack/react-query';

import css from './HotVacancies.module.css';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { getHotVacancies } from '@/lib/vacanciesApi';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from 'next/image';

function HotVacancies() {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    duration: 25,
    align: 'start',
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

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotVacancies'],
    queryFn: () => getHotVacancies(5),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити вакансії');
    }
  }, [isError]);

  if (isLoading) return <Loader />;
  if (isError) return null;

  return (
    <section className={css.hotSection}>
      <div className="container">
        <div className={css.titleBox}>
          <h2 className={css.sectionTitle}>Гарячі вакансії</h2>
          <Link className={css.vacancyLink} href={'/vacancies'}>
            Переглянути всі
          </Link>
        </div>
        <div className={css.viewport} ref={emblaRef}>
          <ul className={css.slides}>
            {data?.map(vacancy => (
              <li
                key={vacancy._id}
                className={`${css.slide} slide`}
                onClick={() => router.push('/vacancies/' + vacancy._id)}>
                <div className={css.logoBox}>
                  <div className={css.skeleton}>
                    <SvgIcon
                      className={css.noImage}
                      name="noImage"
                      width={75}
                      height={75}
                    />
                  </div>

                  {vacancy.employerId.logo && (
                    <Image
                      src={vacancy.employerId.logo}
                      alt={vacancy.employerId.companyName}
                      fill
                      sizes="384px"
                      className={css.logoImage}
                      onLoad={e => {
                        e.currentTarget.style.opacity = '1';
                        const skeleton =
                          e.currentTarget.parentElement?.querySelector<HTMLElement>(
                            `.${css.skeleton}`,
                          );
                        if (skeleton) skeleton.style.display = 'none';
                      }}
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className={css.titleWrapper}>
                  <p className={css.titleCompany}>
                    {vacancy.employerId.companyName}
                  </p>
                  <p className={css.location}>
                    <span>
                      <SvgIcon name="locationOn" width={24} height={24} />
                    </span>
                    {vacancy.isRemote
                      ? vacancy.locationId.name + ' / Віддалено'
                      : vacancy.locationId.name}
                  </p>
                </div>

                <p className={css.title}>{vacancy.title}</p>

                {vacancy.salaryRange && (
                  <p className={css.salary}>
                    <span>
                      <SvgIcon name="payments" width={24} height={24} />
                    </span>
                    {vacancy.salaryRange}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.wrapper}>
          <div className={css.dots}>
            {data?.map((vacancy, index) => {
              const total = data.length;

              const isActive = index === selectedIndex;
              const isAdjacent =
                index === (selectedIndex - 1 + total) % total ||
                index === (selectedIndex + 1) % total;

              return (
                <button
                  key={vacancy._id}
                  type="button"
                  onClick={() => scrollTo(index)}
                  data-active={isActive}
                  data-adjacent={isAdjacent}
                  className={css.dot}
                  aria-label={`Слайд ${index + 1}`}
                />
              );
            })}
          </div>

          <div className={css.controls}>
            <button
              type="button"
              onClick={scrollPrev}
              className={css.navButton}
              aria-label="Попередні">
              <SvgIcon
                className={css.iconNav}
                name="arrowBack"
                width={24}
                height={24}
              />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className={css.navButton}
              aria-label="Наступні">
              <SvgIcon
                className={css.iconNav}
                name="arrowForward"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotVacancies;
