import React from 'react';
import css from './Styles/BackBtn.module.css'

const BackBtn = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button className={css.back} onClick={goBack}>
      <i class="fa-solid fa-left-long"></i>
    </button>
  );
};

export default BackBtn;
