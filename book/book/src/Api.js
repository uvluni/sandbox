import data from './data/listOfBooks.json';

export default class Api {
  constructor() {}

  async getBooks() {
    try {
      // let response = await fetch('http://s3.amazonaws.com/sundaysky-mock/books/listOfBooks.json');
      // let data = await response.json();
      return data.books;
    } catch (error) {
      console.log(error);
    }
  }
}
