import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

import css from './Search.module.css';

const Search = () => {
  return (
    <div className="md:flex md:justify-between md:gap-6 md:items-center mb-6">
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
    </div>
  );
};

export default Search;
