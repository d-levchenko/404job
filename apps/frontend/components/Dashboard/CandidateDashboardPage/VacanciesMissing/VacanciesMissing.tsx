import Link from 'next/link';

import css from './VacanciesMissing.module.css';

type VacanciesMissingProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
};

const VacanciesMissing = ({
  title = 'У вас ще немає збережених вакансій',
  description = 'Збережіть свою першу вакансію, щоб не загубити їх в майбутньому',
  buttonText = 'До вакансій',
  href = '/vacancies',
}: VacanciesMissingProps) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.description}>{description}</p>
      <Link className={css.link} href={href}>
        {buttonText}
      </Link>
    </div>
  );
};

export default VacanciesMissing;