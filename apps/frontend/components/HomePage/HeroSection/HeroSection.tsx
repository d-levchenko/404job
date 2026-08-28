import css from './HeroSection.module.css';

function HeroSection() {
  return (
    <section className={css.heroSection}>
      <div className={`${css.container} container`}>
        <div className={css.box}>
          <h1 className={css.title}>Знайди роботу мрії з JobScape</h1>
          <p className={css.description}>
            Ми зібрали найкращі вакансії від провідних IT-компаній України. Твій
            наступний крок до успіху — лише за один клік.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
