export default class Api {
  constructor() {}

  async getMovies() {
    try {
      let response = await fetch('http://localhost:3000/movies');
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
