'use client';

// apps/frontend/app/error.tsx
// Глобальний error boundary — обов'язково client component (вимога Next.js App Router).

import { useEffect } from 'react';

import css from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // логуємо помилку для діагностики.
    console.error(error);
  }, [error]);

  return (
    <div className={css.wrapper}>
      <p className={css.label}>Помилка</p>
      <h1 className={css.title}>Щось пішло не так</h1>
      <p className={css.description}>
        Виникла непередбачена помилка. Спробуйте ще раз або поверніться пізніше.
      </p>
      <button onClick={() => reset()} className={css.button}>
        Спробувати ще раз
      </button>
    </div>
  );
}
