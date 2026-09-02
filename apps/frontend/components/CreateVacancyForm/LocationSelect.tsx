'use client';

import { ErrorMessage, useFormikContext } from 'formik';
import { useState } from 'react';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import type { Location } from '@/types/vacancyType';

import css from './CreateVacancyForm.module.css';

interface FormValues {
  locationId: string;
}

interface LocationSelectProps {
  locations: Location[];
}

export const LocationSelect = ({ locations }: LocationSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();

  const selectedLocationName = locations.find(
    location => location._id === values.locationId,
  )?.name;

  return (
    <div className={css.inputArea}>
      <span id="location-label">Локація</span>

      <div className={css.locationDropdown}>
        <button
          type="button"
          className={css.locationButton}
          onClick={() => setIsOpen(open => !open)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby="location-label">
          <span>{selectedLocationName ?? 'Оберіть локацію'}</span>

          <SvgIcon
            name="keyboardArrowDown"
            width={20}
            height={20}
            className={`${css.selectIcon} ${isOpen ? css.activeIcon : ''}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul className={css.locationOptions} role="listbox">
            {locations.map(location => (
              <li key={location._id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={values.locationId === location._id}
                  onClick={() => {
                    setFieldValue('locationId', location._id);
                    setFieldTouched('locationId', true);
                    setIsOpen(false);
                  }}>
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ErrorMessage name="locationId" component="span" className={css.error} />
    </div>
  );
};
