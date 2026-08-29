'use client';

import { AllVacancies } from '@/types/vacancyType';
import FiltersFields, { FiltersOptions } from './FilterFields';

import css from './FiltersPanel.module.css';

interface FiltersPanelProps {
  meta: AllVacancies | undefined;
  filters: FiltersOptions;
}

const FiltersPanel = ({ meta, filters }: FiltersPanelProps) => {
  return (
    <aside className="hidden desktop:flex desktop:flex-col desktop:items-start desktop:max-w-76.25 desktop:w-full">
      <h2 className={css.title}>Фільтри</h2>
      <p className={css.description}>
        Показано {meta?.perPage} зі {meta?.totalVacancies}
      </p>

      <div className="flex flex-col gap-6 w-full">
        <FiltersFields filters={filters} idPrefix="desktop" />
      </div>
    </aside>
  );
};

export default FiltersPanel;
