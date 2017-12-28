export default class MovieGrid {
  constructor(domElement) {
    this.domElement = domElement;
  }

  creatMovieElement(movie) {
    return `<div><h3>${movie.title}</h3><img src="${movie.imageUrl}"/></div>`;
  }

  addOnClick() {
    let movies = this.domElement.children;
    for (let movie of movies) {
      movie.onclick = () => {
        console.log(movie.childNodes[0].innerHTML);
      };
    }
  }

  render(movies) {
    let html = '';
    for (let movie of movies) {
      html += this.creatMovieElement(movie);
    }
    this.domElement.innerHTML = html;
    this.addOnClick();
  }
}
