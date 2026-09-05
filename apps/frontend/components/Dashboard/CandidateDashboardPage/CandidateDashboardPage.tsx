'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import css from './CandidateDashboardPage.module.css';
import { useDashboardGuard } from '@/hooks/useDashboardGuard';
import Loader from '@/components/Loader/Loader';

interface CandidateDashboardPageProps {
  children?: ReactNode;
}

const CandidateDashboardPage = ({ children }: CandidateDashboardPageProps) => {
  const pathname = usePathname();
  const isProfileTab = pathname === '/dashboard/candidate';
  const { isAllowed } = useDashboardGuard('candidate');
  if (!isAllowed) return <Loader />;
  return (
    <main className={css.page}>
      <div className="container">
        <h1 className={css.title}>Мій профіль</h1>

        <div className={css.dashboard}>
          <nav className={css.sidebar} aria-label="Навігація профілю">
            <Link
              href="/dashboard/candidate"
              className={`${css.navButton} ${isProfileTab ? css.active : ''}`}
              aria-current={isProfileTab ? 'page' : undefined}>
              Мій профіль
            </Link>

            <Link
              href="/dashboard/candidate/saved-vacancies"
              className={`${css.navButton} ${!isProfileTab ? css.active : ''}`}
              aria-current={!isProfileTab ? 'page' : undefined}>
              Збережені вакансії
            </Link>
          </nav>

          <section
            className={`${css.content} ${
              isProfileTab ? css.profileContent : css.savedContent
            }`}>
            <h2 className={css.sectionTitle}>
              {isProfileTab ? 'Особиста інформація' : 'Збережені вакансії'}
            </h2>

            <div className={css.contentSlot}>{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CandidateDashboardPage;
