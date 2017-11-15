import React from 'react';
import style from './Aside.css';
import Places from '../Places/Places';

const CardList = props => {
  const myStyles = {
    input: { width: '100px' }
  };
  return (
    <div className={`${style.item} ${style.aside}`}>
      <Places styles={myStyles} onLocationSubmit={props.onLocationSubmit} />
    </div>
  );
};

export default CardList;
