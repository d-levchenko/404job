import css from './Loader.module.css';
import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

function Loader() {
  return (
    <div
      className={css.wrapper}
      role="status"
      aria-label="Завантаження вакансій">
      <div className={css.box}>
        <div className={css.rows}>
          <div className={css.row} style={{ animationDelay: '0s' }} />
          <div className={css.row} style={{ animationDelay: '0.2s' }} />
          <div className={css.row} style={{ animationDelay: '0.4s' }} />
        </div>

        <SvgIcon
          name="search"
          width={22}
          height={22}
          className={css.magnifier}
        />
      </div>
    </div>
  );
}

export default Loader;
