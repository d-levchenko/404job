'use client';

import css from './error.module.css';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className={`${css.wrapper} container`}>
      <p className={css.label}>Помилка</p>
      <h1 className={css.title}>Щось пішло не так</h1>
      <p className={css.description}>
        Виникла непередбачена помилка. Спробуйте оновити сторінку або
        поверніться пізніше.
      </p>
      <button onClick={() => reset()} className={css.button}>
        Спробувати ще раз
      </button>
    </div>
  );
}
