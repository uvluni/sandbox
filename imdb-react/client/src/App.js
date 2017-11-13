import React, { Component } from 'react';

import Api from './api';

import MovieGrid from './components/MovieGrid';
import Aside from './components/Aside';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = { movies: [] };
  }

  async componentDidMount() {
    let movies = await this.api.getMovies();
    this.setState({ movies });
  }

  render() {
    let { movies } = this.state;
    return (
      <div className="App">
        <MovieGrid movies={movies} />
        <Aside movies={movies} />
      </div>
    );
  }
}

export default App;
