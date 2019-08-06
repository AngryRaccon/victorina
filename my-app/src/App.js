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
    userAnswers: Array(3).fill(null),
    readyForVerify: false,
    result: ""
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

  checkAnswers = () => {
    const userFinalAnswers = this.state.userAnswers;
    let rightAnswers = [];
    const victorina = this.state.victorina;
    for (let i = 0; i < victorina.length; i++) {
      rightAnswers.push(victorina[i].rightAnswer);
    }
    let result = 0;
    for (let i = 0; i < victorina.length; i++) {
      if (rightAnswers[i] == userFinalAnswers[i]) {
        result++;
      }
    }

    this.setState({ readyForVerify: true });
    this.setState({ result });
  };

  render() {
    return (
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
        {this.state.readyForVerify && <p>Your result is {this.state.result}</p>}
      </form>
    );
  }
}

export default App;
