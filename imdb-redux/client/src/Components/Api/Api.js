// import movies from '../../movies/movies.json';

export default class Api {
  async getMovies() {
    try {
      let response = await fetch('http://localhost:9000/movies');
      let movies = await response.json();
      return movies;
    } catch (error) {
      console.log(error);
    }
  }
}
