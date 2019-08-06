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
    userAnswers: Array(3).fill(null)
  };

  rememberAnswer = e => {
    const indexOfQuestion = e.target.name;
    const variant = e.target.dataset.variant;
    console.log(indexOfQuestion, variant);
    const userAnswers = this.state.userAnswers;
    userAnswers[indexOfQuestion] = variant;
    console.log(userAnswers);
    this.setState({ userAnswers });
  };

  checkAnswers = () => {};

  render() {
    return (
      <form action="#">
        {this.state.victorina.map((elem, idx) => (
          <div>
            <h1>{this.state.victorina[idx].question}</h1>
            {this.state.victorina[idx].answers.map((question, num) => (
              <label>
                <input
                  type="radio"
                  name={idx}
                  data-variant={num}
                  data-right={
                    this.state.victorina[idx].rightAnswer == num ? true : false
                  }
                  onClick={this.rememberAnswer}
                />
                {this.state.victorina[idx].answers[num]}
              </label>
            ))}
          </div>
        ))}
        <button onClick={this.checkAnswers}>Check my answers</button>
      </form>
    );
  }
}

export default App;
