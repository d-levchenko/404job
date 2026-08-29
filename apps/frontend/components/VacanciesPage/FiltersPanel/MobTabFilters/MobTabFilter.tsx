'use client';

import { useEffect, useState } from 'react';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { AllVacancies } from '@/types/vacancyType';
import FiltersFields, { FiltersOptions } from '../FilterFields';

import css from '../FiltersPanel.module.css';

interface MobTabFiltersProps {
  meta: AllVacancies | undefined;
  filters: FiltersOptions;
}

const MobTabFilters = ({ meta, filters }: MobTabFiltersProps) => {
  const [active, setActive] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (active) {
      if (e.target !== e.currentTarget) {
        setActive(false);
      }
    }
  };

  const handleDropdownClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div
      className="mb-8 relative desktop:hidden md:flex md:justify-between"
      onClick={handleBackdropClick}>
      <p className={css.description}>
        Показано {meta?.vacancies.length} зі {meta?.totalVacancies}
      </p>

      <div className={css.formContainer}>
        <button
          type="button"
          className={`${css.button} ${active ? css.activeButton : ''}`}
          onClick={handleDropdownClick}
          aria-expanded={active}>
          Фільтри
          <SvgIcon
            name="keyboardArrowDown"
            width={24}
            height={24}
            className={`${css.selectIcon} ${active ? css.activeIcon : ''}`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`${css.filtersContent} ${active ? css.active : ''} flex flex-col gap-6`}>
          <FiltersFields
            filters={filters}
            idPrefix="mobile"
            onApplied={() => setActive(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MobTabFilters;
