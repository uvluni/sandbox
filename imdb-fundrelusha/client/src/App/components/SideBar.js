import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-row: 2 / 4;
  grid-column: 1 / 2;
  color: white;
`;

const P = styled.p`
  cursor: pointer;
`;

const H2 = styled.h2`
  cursor: pointer;
`;

class SideBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  findDirectors(movies) {
    if (!movies.length) {
      return {};
    }
    return movies.reduce((acc, curr) => {
      acc[curr.director] ? acc[curr.director]++ : (acc[curr.director] = 1);
      return acc;
    }, {});
  }
  findActors(movies) {
    if (!movies.length) {
      return {};
    }

    return movies.reduce((accumulator, currentValue) => {
      return { ...this.findHowMany(currentValue.cast), ...accumulator };
    }, {});
  }

  findHowMany(movies) {
    return movies.reduce((accumulator, currentValue) => {
      accumulator[currentValue.cast]
        ? accumulator[currentValue]++
        : (accumulator[currentValue] = 1);
      return accumulator;
    }, {});
  }

  render() {
    let { movies, handleOnClick, handelClear } = this.props;
    let directors = this.findDirectors(movies);
    let actors = this.findActors(movies);
    return (
      <Wrapper>
        <h2>Directors</h2>
        {Object.keys(directors).map(director => (
          <P key={director} onClick={() => handleOnClick(director, 'director')}>
            {director} ({directors[director]})
          </P>
        ))}
        <h2>Actors</h2>
        {Object.keys(actors).map(actor => (
          <P key={actor} onClick={() => handleOnClick(actor, 'cast')}>
            {actor} ({actors[actor]})
          </P>
        ))}
        <H2 onClick={() => handelClear()}>Clear Search</H2>
      </Wrapper>
    );
  }
}

SideBar.propTypes = {};

export default SideBar;
