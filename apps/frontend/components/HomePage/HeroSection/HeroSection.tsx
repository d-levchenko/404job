import { getFilterOptions } from '@/lib/optionsApi';
import css from './HeroSection.module.css';
import { Location } from '@/types/vacancyType';
import LocationDropdown from './LocationDropdown/LocationDropdown';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

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
            <label className={css.inputLabel} htmlFor="search">
              <SvgIcon
                name="search"
                className={css.icon}
                width={24}
                height={24}
              />
              <input
                className={css.input}
                name="search"
                type="text"
                placeholder="Назва посади, технологія..."
              />
            </label>
            <LocationDropdown locations={locations} />
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
