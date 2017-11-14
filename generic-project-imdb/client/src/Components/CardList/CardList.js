import React from 'react';
import Card from '../Card/Card';
import style from './CardList.css';

const CardList = ({ data, selected }) => {
  return (
    <div className={`${style.item} ${style.cardlist_container}`}>
      {data.map(item => <Card key={item.id} {...item} selected={item.selected} />)}
    </div>
  );
};

export default CardList;
