import React, { Component } from 'react';
import API from '../API/API';
// import TopMenu from '../TopMenu/TopMenu';
import Questions from '../Questions/Questions';

class App extends Component {
  constructor() {
    super();
    this.api = new API();
    this.state = {
      questions: {
        questions: []
      }
    }
    // this.onProfileSelect = this.onProfileSelect.bind(this);
  }

  async componentWillMount() {
    let questions = await this.api.getQuestions();
    // console.log(questions);
    this.setState({ questions });
    // console.log(this.state.questions.questions);
  }

  render() {
    return (
      <div>
        <Questions questions={this.state.questions.questions} />
      </div>
    );
  }
}

export default App;
