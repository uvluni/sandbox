import React from 'react';
import Card from '../Card/Card';
import style from './CardList.css';

const CardList = ({ data }) => {
  return (
    <div className={`${style.item} ${style.cardlist_container}`}>
      {data.map(item => <Card key={item.id} {...item} />)}
    </div>
  );
};

export default CardList;
