import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  text-align: center;
  grid-row: 1 / 2;
  grid-column: 1 / 4;
  color:white;
`;

const H1 = styled.h1`font-size: 20px;`;

const Header = () => {
  return (
    <Wrapper>
      <H1>Movie Night</H1>
    </Wrapper>
  );
};

export default Header;
