import { SvgIcon } from '@/components/SvgIcon/SvgIcon';
import css from './Advantages.module.css';

function Advantages() {
  return (
    <section className={css.sectionAdvantages}>
      <div className="container">
        <h2 className={css.title}>Чому JobScape?</h2>
        <ul className={css.list}>
          <li className={css.item}>
            <SvgIcon name="search" width={48} height={48} />
            <h3 className={css.itemTitle}>Актуальна база вакансій</h3>
            <p className={css.itemDescription}>
              Ми співпрацюємо лише з перевіреними IT-компаніями та щодня
              оновлюємо список вакансій.
            </p>
          </li>
          <li className={css.item}>
            <SvgIcon name="documentSearch" width={48} height={48} />
            <h3 className={css.itemTitle}>Профіль як візитівка</h3>
            <p className={css.itemDescription}>
              Створюйте професійне резюме за допомогою нашого конструктора та
              відстежуйте статуси своїх відгуків.
            </p>
          </li>
          <li className={css.item}>
            <SvgIcon name="messageUnread" width={48} height={48} />
            <h3 className={css.itemTitle}> Прозорі відгуки</h3>
            <p className={css.itemDescription}>
              Дізнавайтеся більше про компанії завдяки відгукам співробітників
              та приймайте виважені рішення.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Advantages;
