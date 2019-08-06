import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    victorina: [
      {
        question: "Q1",
        answers: ["01_01", "01_02", "01_03", "01_04"],
        rightAnswer: 2
      },
      {
        question: "Q2",
        answers: ["02_01", "02_02", "02_03", "02_04"],
        rightAnswer: 1
      },
      {
        question: "Q3",
        answers: ["03_01", "03_02", "03_03", "03_04"],
        rightAnswer: 3
      }
    ],
    userAnswers: Array(3).fill(0),
    readyForVerify: false,
    result: ""
  };

  rememberAnswer = e => {
    const indexOfQuestion = e.target.name;
    const userAnswers = this.state.userAnswers;
    userAnswers[indexOfQuestion] = +e.target.dataset.score;
    this.setState({ userAnswers });
  };

  checkAnswers = () => {
    const userFinalAnswers = this.state.userAnswers;
    let result = this.state.userAnswers.reduce((total, answerScore) => total + answerScore, 0);
    this.setState({ readyForVerify: true });
    this.setState({ result });
  };

  render() {
    return (
      <>
        <form
          action="#"
          className={this.state.readyForVerify ? "forbidClick" : ""}
        >
          {this.state.victorina.map((elem, idx) => (
            <div>
              <h1>{this.state.victorina[idx].question}</h1>
              {this.state.victorina[idx].answers.map((question, num) => (
                <label>
                  <input
                    type="radio"
                    name={idx}
                    data-variant={num}
                    data-score={
                      this.state.victorina[idx].rightAnswer == num ? 1 : 0
                    }
                    onClick={this.rememberAnswer}
                  />
                  {this.state.victorina[idx].answers[num]}
                </label>
              ))}
            </div>
          ))}
        </form>
        <button onClick={this.checkAnswers}>Check my answers</button>
        {this.state.readyForVerify && <p>Your result is {this.state.result}</p>}
      </>
    );
  }
}

export default App;
