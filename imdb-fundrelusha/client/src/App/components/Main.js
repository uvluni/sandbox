import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import SideBar from './SideBar';
import Search from './Search';
import GridView from '../../GridView/GridView';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: 0fr 0fr 1fr;
  grid-gap: 1rem;
  background: black;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], filteredMovies: [], search: '' };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handelClear = this.handelClear.bind(this);
    this.handleClickOnMovie = this.handleClickOnMovie.bind(this);
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:9000/movies');
    let data = await response.json();
    this.setState({ movies: data, filteredMovies: data });
  }

  handleOnChange(input) {
    let searchMovie = this.state.movies.filter(item => item.title.includes(input));
    this.setState({ filteredMovies: searchMovie });
  }

  handleOnClick(name, fieldName) {
    let clickedItem =
      fieldName === 'director'
        ? this.state.movies.filter(item => item[fieldName].includes(name))
        : this.state.movies.filter(item => item[fieldName].filter(movie => movie.includes(name)).length);

    this.setState({ filteredMovies: clickedItem });
  }

  handelClear() {
    this.setState({ filteredMovies: this.state.movies });
  }

  handleClickOnMovie(id) {
    
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <SideBar
          movies={this.state.movies}
          handleOnClick={this.handleOnClick}
          handelClear={this.handelClear}
        />
        <Search handleOnChange={this.handleOnChange} />
        <GridView handleClickOnMovie={this.handleClickOnMovie} movies={this.state.filteredMovies} />
      </Wrapper>
    );
  }
}

export default Main;
