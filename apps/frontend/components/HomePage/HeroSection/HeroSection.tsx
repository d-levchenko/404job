import { getFilterOptions } from '@/lib/optionsApi';
import css from './HeroSection.module.css';
import { Location } from '@/types/vacancyType';

async function HeroSection() {
  const locations: Location[] = await getFilterOptions('locations');
  return (
    <section className={css.heroSection}>
      <div className={`${css.container} container`}>
        <div className={css.box}>
          <h1 className={css.title}>Знайди роботу мрії з JobScape</h1>
          <p className={css.description}>
            Ми зібрали найкращі вакансії від провідних IT-компаній України. Твій
            наступний крок до успіху — лише за один клік.
          </p>

          <form className={css.form} action="/vacancies" method="get">
            <label htmlFor="search">
              <input className={css.input} name="search" type="text" />
            </label>
            <label htmlFor="location">
              <select
                className={css.select}
                name="location"
                id="location"
                defaultValue="">
                <option value="">Уся Україна</option>
                {locations.map(location => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <button className={css.button} type="submit">
              Знайти вакансію
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
