import React from 'react';
import css from './VacanciesDescription.module.css';

interface VacanciesDescriptionProps {
  title?: string;
  description?: string;
  requirements?: string;
  duties?: string;
  plusWillBe?: string;
  weOffer?: string;
}

const renderContent = (content?: string) => {
  if (!content) return null;

  const lines = content
    .split(/\r?\n/)
    .flatMap((line) => line.split(/(?<=\.)\s+/))
    .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return (
      <ul className={css.list}>
        {lines.map((item, index) => (
          <li key={index} className={css.listItem}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <p className={css.text}>{content}</p>;
};

const VacanciesDescription: React.FC<VacanciesDescriptionProps> = ({
  title,
  description,
  requirements,
  duties,
  plusWillBe,
  weOffer,
}) => {
  return (
    <div className={css.container}>
      {title && <h1 className={css.mainTitle}>{title}</h1>}

      {description && (
        <section className={css.section}>
          <p className={css.text}>{description}</p>
        </section>
      )}

      {requirements && (
        <section className={css.section}>
          <h3 className={css.title}>Вимоги</h3>
          {renderContent(requirements)}
        </section>
      )}

      {duties && (
        <section className={css.section}>
          <h3 className={css.title}>{"Обов'язки"}</h3>
          {renderContent(duties)}
        </section>
      )}

      {plusWillBe && (
        <section className={css.section}>
          <h3 className={css.title}>Буде плюсом</h3>
          {renderContent(plusWillBe)}
        </section>
      )}

      {weOffer && (
        <section className={css.section}>
          <h3 className={css.title}>Ми пропонуємо</h3>
          {renderContent(weOffer)}
        </section>
      )}
    </div>
  );
};

export default VacanciesDescription;