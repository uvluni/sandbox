import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMovie } from '../../actions/movies';
import MoviesList from '../MoviesList/MoviesList';
import Api from '../Api/Api';
import selectMovies from '../../selectors/movies';

class Home extends Component {
  constructor(props) {
    super();
    this.api = new Api();
  }

  async componentWillMount() {
    console.log(this.props);
    console.log('mounted');
    let movies = await this.api.getMovies();
    console.log(movies);
    movies.forEach(({ id, title, price, imageUrl }) => {
      this.props.dispatch(addMovie({ id, title, price, imageUrl }));
    });
  }

  render() {
    return (
      <div>
        <MoviesList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: selectMovies(state.movies, state.filters)
  };
};

export default connect(mapStateToProps)(Home);
