// import Data from '../../Data/Data.json';

export default class API {
  
    async getData() {
      try {
        let response = await fetch('http://localhost:9000/api/movies');
        let data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  