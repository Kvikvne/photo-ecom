import css from './Styles/Arrow.module.css'

export default function Arrow() {
  return (
    <div className={css.circle}>
      <span className="material-symbols-outlined">arrow_downward</span>
    </div>
  );
}
