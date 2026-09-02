'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import Loader from '@/components/Loader/Loader';
import { getCurrentAuthUser } from '@/lib/authApi';

import css from './ForEmployers.module.css';

const ForEmployers = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentAuthUser,
    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  const isCandidate = user?.userType === 'candidate';
  const isEmployer = user?.userType === 'employer';

  const buttonHref = isEmployer ? '/dashboard/employer' : '/auth/register';

  return (
    <section className={css.section}>
      <div className={`${css.container} container`}>
        <div className={css.content}>
          <h2 className={css.title}>Шукаєте таланти до своєї команди?</h2>

          <p className={css.description}>
            Наша платформа допоможе вам швидко знайти мотивованих кандидатів,
            які ідеально підійдуть вашій команді. Розміщуйте вакансії, керуйте
            відгуками та аналізуйте результати в одному місці.
          </p>

          {!isError && !isCandidate && (
            <Link href={buttonHref} className={css.button}>
              Розмістити вакансію
            </Link>
          )}
        </div>

        <div className={css.imageWrapper}>
          <Image
            src="/images/webp/for-employers-pc@2x.webp"
            alt="Команда під час робочої зустрічі"
            width={1502}
            height={850}
            sizes="(min-width: 1440px) 751px, (min-width: 768px) 704px, 335px"
            className={css.image}
          />
        </div>
      </div>
    </section>
  );
};

export default ForEmployers;
