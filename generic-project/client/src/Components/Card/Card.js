import React from 'react';
import style from './Card.css';

const Card = ({ title, imageUrl }) => {
  return (
    <div className={style.classWraper}>
      <h4>{title}</h4>
      <img className={style.image} src={imageUrl} alt={title} />
    </div>
  );
};

export default Card;
