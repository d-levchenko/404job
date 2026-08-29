'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import {
  buildFiltersSearchParams,
  useFiltersStore,
} from '@/store/filtersStore';
import {
  EmploymentType,
  ExperienceLevel,
  Industry,
  Location,
} from '@/types/vacancyType';

import css from './FiltersPanel.module.css';

export interface FiltersOptions {
  industries: PromiseSettledResult<Industry[]>;
  locations: PromiseSettledResult<Location[]>;
  experienceLevels: PromiseSettledResult<ExperienceLevel[]>;
  employmentTypes: PromiseSettledResult<EmploymentType[]>;
}

interface FiltersFieldsProps {
  filters: FiltersOptions;
  idPrefix: string;
  onApplied?: () => void;
}

const FiltersFields = ({
  filters,
  idPrefix,
  onApplied,
}: FiltersFieldsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [locationOpen, setLocationOpen] = useState(false);

  const { search, industry, experience, location, employmentType, isRemote } =
    useFiltersStore();
  const toggleValue = useFiltersStore(state => state.toggleValue);
  const setLocation = useFiltersStore(state => state.setLocation);
  const resetStore = useFiltersStore(state => state.reset);

  const selectedLocationName =
    filters.locations.status === 'fulfilled'
      ? filters.locations.value.find(l => l._id === location)?.name
      : undefined;

  const handleApply = () => {
    const params = buildFiltersSearchParams({
      search,
      industry,
      experience,
      location,
      employmentType,
      isRemote,
    });

    router.push(params.size ? `${pathname}?${params}` : pathname);
    onApplied?.();
  };

  const handleReset = () => {
    resetStore();
    router.push(pathname);
    onApplied?.();
  };

  return (
    <>
      <div className={css.filtersScroll}>
        <fieldset>
          <legend className={`${css.legend} ${css.industry}`}>Галузі</legend>
          <ul className="flex flex-col">
            {filters.industries.status === 'fulfilled' &&
              filters.industries.value.map(item => (
                <li key={item._id} className={css.item}>
                  <input
                    type="checkbox"
                    id={`${idPrefix}-${item._id}`}
                    className={css.checkboxInput}
                    checked={industry.includes(item._id)}
                    onChange={() => toggleValue('industry', item._id)}
                  />
                  <label
                    htmlFor={`${idPrefix}-${item._id}`}
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
                    {item.name}
                  </label>
                </li>
              ))}
          </ul>
        </fieldset>

        <fieldset>
          <legend className={css.legend}>Рівень досвіду</legend>
          <ul className="flex flex-col">
            {filters.experienceLevels.status === 'fulfilled' &&
              filters.experienceLevels.value.map(item => (
                <li key={item._id} className={css.item}>
                  <input
                    type="checkbox"
                    id={`${idPrefix}-${item._id}`}
                    className={css.checkboxInput}
                    checked={experience.includes(item._id)}
                    onChange={() => toggleValue('experience', item._id)}
                  />
                  <label
                    htmlFor={`${idPrefix}-${item._id}`}
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
                    {item.name}
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
              onClick={() => setLocationOpen(prev => !prev)}
              aria-expanded={locationOpen}>
              <span>{selectedLocationName ?? 'Вся Україна'}</span>
              <SvgIcon
                name="keyboardArrowDown"
                width={24}
                height={24}
                className={`${css.selectIcon} ${locationOpen ? css.activeIcon : ''}`}
                aria-hidden="true"
              />
            </button>

            {locationOpen && (
              <ul className={css.locationOptions}>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(null);
                      setLocationOpen(false);
                    }}>
                    Вся Україна
                  </button>
                </li>

                {filters.locations.status === 'fulfilled' &&
                  filters.locations.value.map(item => (
                    <li key={item._id}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocation(location === item._id ? null : item._id);
                          setLocationOpen(false);
                        }}>
                        {item.name}
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
              filters.employmentTypes.value.map(item => (
                <li key={item._id} className={css.item}>
                  <input
                    type="checkbox"
                    id={`${idPrefix}-${item._id}`}
                    className={css.checkboxInput}
                    checked={employmentType.includes(item._id)}
                    onChange={() => toggleValue('employmentType', item._id)}
                  />
                  <label
                    htmlFor={`${idPrefix}-${item._id}`}
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
                    {item.name}
                  </label>
                </li>
              ))}
          </ul>
        </fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          className={`${css.submitButton}`}
          onClick={handleApply}>
          Застосувати фільтри
        </button>

        <button
          type="button"
          className={`${css.submitButton} ${css.reset}`}
          onClick={handleReset}>
          Скинути фільтри
        </button>
      </div>
    </>
  );
};

export default FiltersFields;
