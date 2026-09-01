import { useRouter } from 'next/navigation';
import css from './RequestReturnedNothing.module.css';

const RequestReturnedNothing = () => {
  const router = useRouter();

  const resetFilters = () => {
    router.push('/vacancies');
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>За вашим запитом нічого не знайдено</h2>

      <p className={css.description}>
        Спробуйте змінити ваш запит, або можете скинути фільтри
      </p>

      <button className={css.button} onClick={resetFilters}>
        Скинути фільтри
      </button>
    </div>
  );
};

export default RequestReturnedNothing;
