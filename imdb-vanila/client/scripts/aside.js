// import MovieGrid from './movieGrid.js';

export default class Aside {
  constructor(domElement, handleDirectorClick) {
    this.domElement = domElement;
    this.handleDirectorClick = handleDirectorClick;
    // this.movieGrid = new MovieGrid(document.getElementById('movies-container'));
  }

  creatNameElement(name, filmsCount, filter) {
    return `<p class="${filter}"><span>${name}</span><span>(${filmsCount})</span></p>`;
  }

  addOnClick() {
    let elements = this.domElement.children;
    for (let element of elements) {
      let filter = element.className;
      element.onclick = () => {
        let elementName = element.children[0].innerText;
        this.handleDirectorClick(elementName, filter);
      };
    }
  }

  render(movies) {
    let html =
      '<h3 class="filter"><span>Directors:</span></h3><h5 class="clear"><p>Clear</p></h5><p class="clearfix"/>';

    const countDirectors = movies.reduce((directors, movie) => {
      directors[movie.director] = (directors[movie.director] || 0) + 1;
      return directors;
    }, {});

    Object.keys(countDirectors).forEach(director => {
      html += this.creatNameElement(director, countDirectors[director], 'director');
    });

    html += '<br/><h3 class="filter"><span>Actors:</span></h3><h5 class="clear"><p>Clear</p></h5><p class="clearfix"/>';

    const countActors = movies.reduce((actors, movie) => {
      for (let actor of movie.cast) {
        actors[actor] = (actors[movie.cast] || 0) + 1;
      }
      return actors;
    }, {});

    Object.keys(countActors).forEach(actor => {
      html += this.creatNameElement(actor, countActors[actor], 'actor');
    });

    this.domElement.innerHTML = html;

    this.addOnClick();
  }
}
