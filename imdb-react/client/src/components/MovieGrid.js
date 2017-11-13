import React from 'react';

import Movie from './Movie';

const MovieGrid = ({ movies }) => {
  return <div>{movies.map(movie => <Movie key={movie.id} {...movie} />)}</div>;
};

export default MovieGrid;
