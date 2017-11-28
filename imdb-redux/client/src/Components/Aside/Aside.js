import React from 'react';
import style from './Aside.css';

const CardList = ({ movies, onClick }) => {
  return (
    <ul className={`${style.item} ${style.aside}`}>
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onClick(movie.id)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
};

export default CardList;
