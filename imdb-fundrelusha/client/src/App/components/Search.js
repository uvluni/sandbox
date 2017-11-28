import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 4;
`;

const Input = styled.input`
  height: 5vh;
  width: 99%;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value });
    this.props.handleOnChange(e.target.value);
  }

  render() {
    return (
      <Wrapper>
        <Input value={this.state.value} onChange={e => this.handleOnChange(e)} placeholder="Search" />
      </Wrapper>
    );
  }
}

Search.propTypes = {};

export default Search;
