'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DASHBOARD_TABS, isDashboardTab } from '@/constants/dashboard';
import ProfileForm from './ProfileForm/ProfileForm';
import SavedVacanciesList from './SavedVacanciesList/SavedVacanciesList';

const CandidateDashboardPage = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = isDashboardTab(tabParam) ? tabParam : 'profile';

  return (
    <section className="w-full bg-white px-5 py-12 md:px-8 desktop:px-16">
      <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-8">
        <h1 className="text-[40px]/[48px] font-bold tracking-[-0.4px] text-black desktop:text-[56px]/[67.2px] desktop:tracking-[-0.56px]">
          Мій профіль
        </h1>

        <div className="flex flex-col gap-8 desktop:flex-row desktop:items-start">
          <nav
            aria-label="Розділи кабінету"
            className="flex w-full flex-col md:w-[304px] md:shrink-0 md:gap-3">
            {DASHBOARD_TABS.map(tab => (
              <Link
                key={tab.id}
                href={`/dashboard/candidate?tab=${tab.id}`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`flex w-full items-center gap-2 rounded-full py-1.5 text-[14px]/[21px] text-black desktop:text-[16px]/[24px] ${
                  activeTab === tab.id ? 'font-bold underline' : 'font-normal'
                }`}>
                {tab.label}
              </Link>
            ))}
          </nav>

          {activeTab === 'profile' ? <ProfileForm /> : <SavedVacanciesList />}
        </div>
      </div>
    </section>
  );
};

export default CandidateDashboardPage;
