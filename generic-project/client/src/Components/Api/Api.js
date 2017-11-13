// import data from '../../data/data.json';

export default class Api {
  async getData() {
    try {
      let response = await fetch('http://localhost:9000/data');
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
