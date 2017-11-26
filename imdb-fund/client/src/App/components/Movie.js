import React from 'react';
import styled from 'styled-components';

const Img = styled.img`width: 100%;`;

const H3 = styled.h3`text-align: center;`;

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = { movie: {} };
  }

  async componentDidMount() {
    let response = await fetch(`http://localhost:9000/movies/${this.props.match.params.id}`);
    let data = await response.json();
    console.log(data);
    this.setState({ movie: data });
  }

  render() {
    let movie = this.state.movie;
    return (
      <div>
        <H3>{movie.title}</H3>
        <Img src={movie.imageUrl} alt="Movie Loading" />
      </div>
    );
  }
}

Movie.propTypes = {};

export default Movie;
