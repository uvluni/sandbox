import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Img = styled.img`width: 100%;`;

const H3 = styled.h3`text-align: center;`;

const Movie = ({ movie, handleClickOnMovie }) => {
  return (
    <div onClick={() => handleClickOnMovie(movie.id)}>
      <Link to={`/${movie.id}`}>
        <H3>{movie.title}</H3>
        <Img src={movie.imageUrl} alt="Movie Loading" />
      </Link>
    </div>
  );
};

export default Movie;
