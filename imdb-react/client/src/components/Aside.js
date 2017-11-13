import React, { Component, PropTypes } from 'react';

class Aside extends Component {
  constructor() {
    super();
  }

  renderDirectors(movies) {
    if (movies.length === 0) {
      return {};
    }

    let countDirectors = movies.reduce((directors, movie) => {
      directors[movie.director] = (directors[movie.director] || 0) + 1;
      return directors;
    }, {});

    return countDirectors;
  }

  render() {
    let { movies } = this.props;
    let directors = this.renderDirectors(movies);
    return (
      <div>
        {Object.keys(directors).map(director => (
          <h5 key={director}>
            {director} ({directors[director]})
          </h5>
        ))}
      </div>
    );
  }
}

export default Aside;

// countDirectors.map(director => {
//   console.log('direc', director);
// });
