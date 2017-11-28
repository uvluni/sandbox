import React from 'react';
import { Link } from 'react-router-dom';

const MoviesListItem = ({ id, title, price, createdAt }) => {
  return (
    <div>
      <Link to={`/youtube/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>Price: {price / 100}</p>
    </div>
  );
};
export default MoviesListItem;
