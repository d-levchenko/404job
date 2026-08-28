'use client';

import css from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={css.wrapper}>
      <p className={css.label}>Помилка</p>
      <h1 className={css.title}>Щось пішло не так</h1>
      <p className={css.description}>Помилка: {error.message}</p>
      <button onClick={() => reset()} className={css.button}>
        Спробувати ще раз
      </button>
    </div>
  );
}
