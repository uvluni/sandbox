import React from 'react';
import style from './Card.css';

const Card = ({ title, imageUrl, selected }) => {
  return (
    <div className={`${style.classWraper} ${style[selected]}`}>
      <h4>{title}</h4>
      <img className={style.image} src={imageUrl} alt={title} />
    </div>
  );
};

export default Card;
