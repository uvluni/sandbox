import Api from './api.js';
import MovieGrid from './movieGrid.js';
import Aside from './aside.js';

class Main {
  constructor() {
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.movieGrid = new MovieGrid(document.querySelector('.movies-container'));
    this.aside = new Aside(document.querySelector('.aside'), this.handleFilterClick);
    this.api = new Api();
  }

  async init() {
    this.movies = await this.api.getMovies();
    this.aside.render(this.movies);
    this.render(this.movies);
  }

  render(movies) {
    this.movieGrid.render(movies);
  }

  handleFilterClick(filterBy, filter) {
    let filteredMovies = this.movies.filter(movie => {
      if (filter === 'director') {
        if (movie.director === filterBy) {
          return movie;
        }
      } else if (filter === 'actor') {
        for (let actor of movie.cast) {
          if (actor === filterBy) {
            return movie;
          }
        }
      } else {
        return movie;
      }
    });

    this.movieGrid.render(filteredMovies);
  }
}

const main = new Main();
main.init();
