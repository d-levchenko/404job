'use client';

import { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import { useFiltersStore } from '@/store/filtersStore';

import css from './Search.module.css';

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = useFiltersStore(state => state.search);
  const setSearch = useFiltersStore(state => state.setSearch);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set('search', search);
    else params.delete('search');
    params.delete('page');

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
          value={search}
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
