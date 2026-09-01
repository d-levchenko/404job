'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import css from './EmployerDashboardPage.module.css';

interface EmployerDashboardPageProps {
  children: ReactNode;
}

const EmployerDashboardPage = ({ children }: EmployerDashboardPageProps) => {
  const pathname = usePathname();

  const isProfileActive = pathname === '/dashboard/employer';

  const isVacanciesActive = pathname === '/dashboard/employer/vacancies';

  return (
    <main className={css.page}>
      <h1 className={css.title}>Мій профіль</h1>

      <div className={css.dashboard}>
        <nav className={css.navigation}>
          <Link
            href="/dashboard/employer"
            className={`${css.navLink} ${isProfileActive ? css.active : ''}`}>
            Профіль компанії
          </Link>

          <Link
            href="/dashboard/employer/vacancies"
            className={`${css.navLink} ${isVacanciesActive ? css.active : ''}`}>
            Відкриті вакансії
          </Link>
        </nav>

        <section className={css.content}>{children}</section>
      </div>
    </main>
  );
};

export default EmployerDashboardPage;
