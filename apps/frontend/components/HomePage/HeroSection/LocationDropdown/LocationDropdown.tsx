'use client';

import { useState } from 'react';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { Location } from '@/types/vacancyType';
import css from './LocationDropdown.module.css';

interface LocationDropdownProps {
  locations: Location[];
}

function LocationDropdown({ locations }: LocationDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  const selectedName =
    locations.find(location => location._id === selected)?.name ??
    'Уся Україна';

  return (
    <div className={css.locationDropdown}>
      <input type="hidden" name="location" value={selected} />

      <button
        type="button"
        className={css.locationButton}
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}>
        <span>{selectedName}</span>
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
            <button type="button" onClick={() => handleSelect('')}>
              Уся Україна
            </button>
          </li>
          {locations.map(location => (
            <li key={location._id}>
              <button type="button" onClick={() => handleSelect(location._id)}>
                {location.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationDropdown;
