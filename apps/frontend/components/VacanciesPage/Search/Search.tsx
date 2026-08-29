'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import {
  buildFiltersSearchParams,
  useFiltersStore,
} from '@/store/filtersStore';

import css from './Search.module.css';

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();

  const filtersState = useFiltersStore();
  const setSearch = useFiltersStore(state => state.setSearch);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const params = buildFiltersSearchParams(filtersState);
    router.push(params.size ? `${pathname}?${params}` : pathname);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:flex md:justify-between md:gap-6 md:items-center mb-6">
      <div className={css.searchWrapper}>
        <SvgIcon
          name="search"
          width={24}
          height={24}
          aria-label="Пошук"
          className={css.searchIcon}
        />
        <input
          type="text"
          placeholder="Пошук"
          className={css.input}
          value={filtersState.search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <button type="submit" className={css.submitButton}>
        Знайти вакансії
      </button>
    </form>
  );
};

export default Search;
