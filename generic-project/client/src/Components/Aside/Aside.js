import React from 'react';
import style from './Aside.css';

const CardList = ({ data, onClick }) => {
  return (
    <ul className={`${style.item} ${style.aside}`}>
      {data.map(item => <li onClick={() => onClick(item.id)}>{item.title}</li>)}
    </ul>
  );
};

export default CardList;
