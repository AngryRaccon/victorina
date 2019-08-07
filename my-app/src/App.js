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
    userScore: Array(3).fill(0),
    userAnswers: Array(3).fill(undefined),
    readyForVerify: false,
    result: "",
    currQuestion: 0
  };

  rememberAnswer = e => {
    const indexOfQuestion = e.target.name;
    const indexOfAnswer = e.target.dataset.variant;
    console.log(indexOfQuestion, indexOfAnswer);
    const userScore = this.state.userScore;
    const userAnswers = this.state.userAnswers;
    userScore[indexOfQuestion] = +e.target.dataset.score;
    userAnswers[indexOfQuestion] = indexOfAnswer;
    this.setState({ userScore, userAnswers });
  };

  checkAnswers = () => {
    const userFinalAnswers = this.state.userScore;
    let result = this.state.userScore.reduce(
      (total, answerScore) => total + answerScore,
      0
    );
    this.setState({ readyForVerify: true, result });
  };

  toNextQuestion = () => {
    let currQuestion = ++this.state.currQuestion;
    this.setState({ currQuestion });
  };

  toPrevQuestion = () => {
    let currQuestion = --this.state.currQuestion;
    this.setState({ currQuestion });
  };

  render() {
    const current = this.state.currQuestion;
    const isNextHidden =
      current < this.state.victorina.length - 1 ? "" : "hidden";
    const isPrevHidden = current > 0 ? "" : "hidden";
    return (
      <>
        <form
          action="#"
          className={this.state.readyForVerify ? "forbidClick" : ""}
        >
          <h1 className="question">{this.state.victorina[current].question}</h1>
          {this.state.victorina[current].answers.map((question, num) => (
            <label className="variantsOfAnswers">
              <input
                type="radio"
                name={current}
                data-variant={num}
                data-score={
                  this.state.victorina[current].rightAnswer == num ? 1 : 0
                }
                onClick={this.rememberAnswer}
                checked={num == this.state.userAnswers[current] ? true : false}
              />
              {this.state.victorina[current].answers[num]}
            </label>
          ))}
        </form>
        <button
          onClick={this.toPrevQuestion}
          className={`button ${isPrevHidden}`}
        >
          Prev
        </button>

        <button
          onClick={this.toNextQuestion}
          className={`button ${isNextHidden}`}
        >
          Next
        </button>
        <button onClick={this.checkAnswers} className="button checkAnswers">
          Check my answers
        </button>
        {this.state.readyForVerify && <p>Your result is {this.state.result}</p>}
      </>
    );
  }
}

export default App;
