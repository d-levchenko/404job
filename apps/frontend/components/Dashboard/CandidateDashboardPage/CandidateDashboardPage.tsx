'use client';

import { type ReactNode, useState } from 'react';

import SavedVacanciesList from './SavedVacanciesList/SavedVacanciesList';

import css from './CandidateDashboardPage.module.css';

type ActiveTab = 'profile' | 'saved';

interface CandidateDashboardPageProps {
  children?: ReactNode;
}

const CandidateDashboardPage = ({ children }: CandidateDashboardPageProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

  const isProfileTab = activeTab === 'profile';

  return (
    <main className={css.page}>
      <div className="container">
        <h1 className={css.title}>Мій профіль</h1>

        <div className={css.dashboard}>
          <nav className={css.sidebar} aria-label="Навігація профілю">
            <button
              className={`${css.navButton} ${isProfileTab ? css.active : ''}`}
              type="button"
              onClick={() => setActiveTab('profile')}
              aria-current={isProfileTab ? 'page' : undefined}>
              Мій профіль
            </button>

            <button
              className={`${css.navButton} ${!isProfileTab ? css.active : ''}`}
              type="button"
              onClick={() => setActiveTab('saved')}
              aria-current={!isProfileTab ? 'page' : undefined}>
              Збережені вакансії
            </button>
          </nav>

          <section
            className={`${css.content} ${
              isProfileTab ? css.profileContent : css.savedContent
            }`}>
            <h2 className={css.sectionTitle}>
              {isProfileTab ? 'Особиста інформація' : 'Збережені вакансії'}
            </h2>

            {isProfileTab ? (
              <div className={css.contentSlot}>{children}</div>
            ) : (
              <SavedVacanciesList />
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CandidateDashboardPage;