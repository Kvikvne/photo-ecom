import css from "./PrintItem.module.css";
import { Link } from "react-router-dom";

export default function PrintItem({ title, thumb, description, price, id }) {
  return (
    <div className={css.container}>
      <Link to={`/${id}`}>
        <img src={thumb} alt="" />
      </Link>
      <div className={css.title}>
        <h2>{title}</h2>
      </div>
      <div className={css.description}>
        <p>{description}</p>
      </div>
      <div className={css.bottom}>
        <div className={css.spacer}></div>
        {/* <div className={css.price}>
          <p>${price}</p>
        </div> */}
        <Link to={`/${id}`}>
          <div className={css.btn}>
            <p>More info</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
