import questions from './data.json';


export default class API {


  async getQuestions() {
    try {
      // let response = await fetch('http://www.questions.com');
      // let profiles = await response.json();
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
}
