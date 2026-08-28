'use client';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { useState } from 'react';
import { AllVacancies } from '@/types/vacancyType';

import css from './FiltersPanel.module.css';

interface FiltersPanelProps {
  params: AllVacancies | undefined;
}

const FiltersPanel = ({ params }: FiltersPanelProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <aside className="mb-6">
      <h2 className={css.title}>Фільтри</h2>
      <p className={css.description}>
        Показано {params?.perPage} зі {params?.totalVacancies}
      </p>

      <form>
        <button className={css.button} type="button" onClick={handleClick}>
          Фільтри
          <SvgIcon
            name="keyboardArrowDown"
            width={24}
            height={24}
            className={`${css.selectIcon} ${active ? css.activeIcon : ''}`}
            aria-label="Показати фільтри"
          />
        </button>

        <div className={css.searchWrapper}>
          <SvgIcon
            name="search"
            width={24}
            height={24}
            aria-label="Пошук"
            className={css.searchIcon}
          />
          <input type="text" placeholder="Пошук" className={css.input} />
        </div>

        <button type="submit" className={css.submitButton}>
          Знайти вакансії
        </button>
      </form>
    </aside>
  );
};

export default FiltersPanel;
