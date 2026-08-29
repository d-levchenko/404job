'use client';

import { useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setActive(prev => !prev);
  };

  useEffect(() => {
    if (!active) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div className="mb-8 relative desktop:hidden md:flex md:justify-between">
      <p className={css.description}>
        Показано {meta?.vacancies.length} зі {meta?.totalVacancies}
      </p>

      <div className={css.formContainer} ref={containerRef}>
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
