import Link from 'next/link';

import css from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <p className={css.code}>404</p>
      <h1 className={css.title}>Сторінку не знайдено</h1>
      <p className={css.description}>
        Схоже, такої сторінки не існує або її було переміщено.
      </p>
      <Link href="/" className={css.button}>
        На головну
      </Link>
    </div>
  );
}
