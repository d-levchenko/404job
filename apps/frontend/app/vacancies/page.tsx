import FiltersPanel from '@/components/VacanciesPage/FiltersPanel/FiltersPanel';

import css from './page.module.css';

const VacanciesPage = () => {
  return (
    <main className="bg-(--color-scheme-1-background) px-5 py-12">
      <div className=" w-full max-w-93.75 mx-auto">
        <h1 className={css.title}>Вакансії</h1>

        <FiltersPanel />
      </div>
    </main>
  );
};

export default VacanciesPage;
