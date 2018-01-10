import React from 'react';
import style from './Cards.css';

const Cards = ({ cards }) => {

  let cardsList = cards.map((element) => {
    let card =
      <div key={element.id} value={element.id} >
        <div>
          <img src={element.imageUrl} alt={element.full} />
          <p>{element.full}</p>
        </div>
        <p>{element.bio}</p>
      </div>
    return card;
  }
  );

  return (
    <div className={style.cards}>
      {cardsList}
    </div>
  );
};

export default Cards;
