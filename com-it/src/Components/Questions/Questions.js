import React from 'react';
import style from './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      answer: this.props.answer
      // questions: props
    }
    this.setAnswer = this.setAnswer.bind(this);
  }

  setAnswer(e) {
    this.setState({
      answer: e.target.value
    })
  }

  render() {

    let questionsList = this.props.questions.map((element) => {
      let question =
        <div key={element.id} value={element.id} >
          <div className="radio">
            <p>{element.q}</p>

            <input type="radio" checked={answer === "0"}
              onClick={this.setAnswer} value="0" /> {element[0]}

            <input type="radio" checked={answer === "1"}
              onClick={this.setAnswer} value="1" /> {element[1]}

            <input type="radio" checked={answer === "2"}
              onClick={this.setAnswer} value="2" /> {element[2]}

            <input type="radio" checked={answer === "3"}
              onClick={this.setAnswer} value="3" /> {element[3]}
          </div>

        </div >
      return question;
    }
    );

    const { answer } = this.state;

    return (
      <div className={style.questions}>
        {questionsList}
        {"Select answer: "} {answer}
      </div>
    );
  }
};

export default Questions;
