'use client';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { useState } from 'react';
import {
  AllVacancies,
  EmploymentType,
  ExperienceLevel,
  Industry,
  Location,
} from '@/types/vacancyType';

import css from './FiltersPanel.module.css';

interface FiltersPanelProps {
  params: AllVacancies | undefined;
  filters: {
    industries: PromiseSettledResult<Industry[]>;
    locations: PromiseSettledResult<Location[]>;
    experienceLevels: PromiseSettledResult<ExperienceLevel[]>;
    employmentTypes: PromiseSettledResult<EmploymentType[]>;
  };
}

const FiltersPanel = ({ params, filters }: FiltersPanelProps) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleClick = () => {
    setActive(!active);
  };

  const handleFilterOpen = () => {
    setOpen(!open);
  };

  const handleFilterSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <aside className="mb-6">
      <h2 className={css.title}>Фільтри</h2>
      <p className={css.description}>
        Показано {params?.perPage} зі {params?.totalVacancies}
      </p>

      <form className={css.form}>
        <div className={css.formContainer}>
          <button
            className={`${css.button} ${active ? css.activeButton : ''}`}
            type="button"
            onClick={handleClick}>
            Фільтри
            <SvgIcon
              name="keyboardArrowDown"
              width={24}
              height={24}
              className={`${css.selectIcon} ${active ? css.activeIcon : ''}`}
              aria-label="Показати фільтри"
            />
          </button>

          <div
            className={`${css.filtersContent} ${active ? css.active : ''} flex flex-col gap-6`}>
            <div className={css.filtersScroll}>
              <fieldset>
                <legend className={`${css.legend} ${css.industry}`}>
                  Галузі
                </legend>

                <ul className="flex flex-col">
                  {filters.industries.status === 'fulfilled' &&
                    filters.industries.value.map(industry => (
                      <li key={industry._id} className={css.item}>
                        <input
                          type="checkbox"
                          id={industry._id}
                          className={css.checkboxInput}
                        />

                        <label htmlFor={industry._id} className={css.label}>
                          <div className={css.checkboxWrapper}>
                            <SvgIcon
                              name="checkbox"
                              width={20}
                              height={20}
                              className={css.checkbox}
                              aria-hidden="true"
                            />
                          </div>

                          {industry.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </fieldset>

              <fieldset>
                <legend className={css.legend}>Рівень досвіду</legend>

                <ul className="flex flex-col">
                  {filters.experienceLevels.status === 'fulfilled' &&
                    filters.experienceLevels.value.map(experienceLevel => (
                      <li key={experienceLevel._id} className={css.item}>
                        <input
                          type="checkbox"
                          id={experienceLevel._id}
                          className={css.checkboxInput}
                        />

                        <label
                          htmlFor={experienceLevel._id}
                          className={css.label}>
                          <div className={css.checkboxWrapper}>
                            <SvgIcon
                              name="checkbox"
                              width={20}
                              height={20}
                              className={css.checkbox}
                              aria-hidden="true"
                            />
                          </div>

                          {experienceLevel.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </fieldset>

              <fieldset className="relative">
                <div className={css.locationDropdown}>
                  <button
                    type="button"
                    className={css.locationButton}
                    onClick={handleFilterOpen}
                    aria-expanded={open}>
                    <span>
                      {selected
                        ? filters.locations.status === 'fulfilled' &&
                          filters.locations.value.find(
                            location => location._id === selected,
                          )?.name
                        : 'Вся Україна'}
                    </span>

                    <SvgIcon
                      name="keyboardArrowDown"
                      width={24}
                      height={24}
                      className={`${css.selectIcon} ${open ? css.activeIcon : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {open && (
                    <ul className={css.locationOptions}>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleFilterSelect('')}>
                          Вся Україна
                        </button>
                      </li>

                      {filters.locations.status === 'fulfilled' &&
                        filters.locations.value.map(location => (
                          <li key={location._id}>
                            <button
                              type="button"
                              onClick={() => handleFilterSelect(location._id)}>
                              {location.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend className={css.legend}>Тип Зайнятості</legend>

                <ul className="flex flex-col">
                  {filters.employmentTypes.status === 'fulfilled' &&
                    filters.employmentTypes.value.map(employmentType => (
                      <li key={employmentType._id} className={css.item}>
                        <input
                          type="checkbox"
                          id={employmentType._id}
                          className={css.checkboxInput}
                        />

                        <label
                          htmlFor={employmentType._id}
                          className={css.label}>
                          <div className={css.checkboxWrapper}>
                            <SvgIcon
                              name="checkbox"
                              width={20}
                              height={20}
                              className={css.checkbox}
                              aria-hidden="true"
                            />
                          </div>

                          {employmentType.name}
                        </label>
                      </li>
                    ))}
                </ul>
              </fieldset>
            </div>

            <div>
              <button
                type="button"
                className={`${css.submitButton} ${css.apply}`}>
                Застосувати фільтри
              </button>

              <button
                type="reset"
                className={`${css.submitButton} ${css.reset}`}>
                Скинути фільтри
              </button>
            </div>
          </div>
        </div>

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

        <button type="button" className={css.submitButton}>
          Знайти вакансії
        </button>
      </form>
    </aside>
  );
};

export default FiltersPanel;
