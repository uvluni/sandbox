import React from 'react';
import styled from 'styled-components';
import Movie from './components/Movie';

const Wrapper = styled.div`
  grid-row: 3 / 4;
  grid-column: 2 / 4;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  background: white;
  padding: 0 5px;
`;

const GridView = ({ movies, handleClickOnMovie }) => (
  <Wrapper>
    {movies.map(movie => <Movie handleClickOnMovie={handleClickOnMovie} key={movie.title} movie={movie} />)}
  </Wrapper>
);

export default GridView;
