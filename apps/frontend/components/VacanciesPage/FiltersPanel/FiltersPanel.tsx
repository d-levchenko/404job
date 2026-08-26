import css from './FiltersPanel.module.css';

const FiltersPanel = () => {
  return (
    <aside>
      <form>
        <h2 className={css.title}>Фільтри</h2>

        <p className={css.description}>Показано 8 зі 100</p>

        <select className={css.select}>
          <option value="all">Фільтри</option>
          <option value="active">Активні</option>
          <option value="archived">Архівні</option>
        </select>
      </form>
    </aside>
  );
};

export default FiltersPanel;
