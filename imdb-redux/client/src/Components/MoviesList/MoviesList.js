import React from 'react';
import { connect } from 'react-redux';
import MoviesListItem from '../MoviesListItem/MoviesListItem';
import selectMovies from '../../selectors/movies';

const MoviesList = props => (
  <div>
    <h1>Movies List</h1>
    {props.movies.map(movie => {
      console.log(movie);
      return <MoviesListItem key={movie.id} {...movie} />;
    })}
  </div>
);

const mapStateToProps = state => {
  return {
    movies: selectMovies(state.movies, state.filters)
  };
};

export default connect(mapStateToProps)(MoviesList);
