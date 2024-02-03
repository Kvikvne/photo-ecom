import css from "./Styles/AllLoadingState.module.css";

export default function AllLoadingState() {
  return (
    <div className={css.container}>
      <div className={css.productCard}>
        <a>
          <div className={css.productImg}>
            <img src="" alt="" />
          </div>
        </a>
        <div className={css.productP}>
          <h4></h4>
        </div>

        <div className={css.bottom}>
          <div className={css.price}>
            <p></p>
          </div>
          <div className={css.size}>
            <h4></h4>
            <p></p>
          </div>
          
        </div>
        <div className={css.detailBtn}></div>
      </div>
    </div>
  );
}
