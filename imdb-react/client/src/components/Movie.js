import React from 'react';

const Movie = ({ title, imageUrl }) => {
  return (
    <div>
      <h3>{title}</h3>
      <img src={imageUrl} />
    </div>
  );
};

export default Movie;
