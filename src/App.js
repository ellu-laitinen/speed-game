import React, { Component } from 'react';
import './App.css';
import Circle from './Circle/Circle.js';
import GameOver from './GameOver/GameOver.js';


const getInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    showGameOver: false,
    rounds: 0
  };

  pace = 1300;
  timer = undefined;

  next = () => {

    if (this.state.rounds >= 5) {
      this.endHandler();
      return;

    }

    let nextActive = undefined;

    do {
      nextActive = getInteger(1, 4);
    } while (nextActive === this.state.current)

    this.setState(
      {
        current: nextActive,
        rounds: this.state.rounds + 1,
      });

    this.pace *= 0.98;
    this.timer = setTimeout(this.next, this.pace);
    console.log(this.state.current);

  };

  clickHandler = (circleID) => {

    /*  let audio1 = new Audio("slap.mp3");
     console.log('Clicked ', circleID); */

    if (this.state.current !== circleID) {
      this.endHandler();
      return;
    }

    /*    audio1.play(); */


    this.setState({
      score: this.state.score + 1,
      rounds: 0,

    });
  };

  startHandler = () => {
    this.next();
  };

  endHandler = () => {

    let audio2 = new Audio("applause4.mp3");
    /*    let audio3 = new Audio('cheer.mp3'); */
    clearTimeout(this.timer);

    this.setState({
      showGameOver: true
    });
    audio2.play();
    /* audio3.play(); */
  };

  render() {
    return (
      <div>

        <h1>Speed Game</h1>
        <p>Current score: {this.state.score}</p>


        <Circle active={this.state.current === 1} buttonColor="green" click={this.clickHandler.bind(this, 1)}></Circle>
        <Circle active={this.state.current === 2} buttonColor="yellow" click={this.clickHandler.bind(this, 2)}></Circle>
        <Circle active={this.state.current === 3} buttonColor="purple" click={this.clickHandler.bind(this, 3)}></Circle>
        <Circle active={this.state.current === 4} buttonColor="orange" click={this.clickHandler.bind(this, 4)}></Circle>

        <div className="buttons">
          <button onClick={this.startHandler} className="button">Start Game</button>
          <button onClick={this.endHandler} className="button">Stop Game</button>
        </div>
        {this.state.showGameOver && <GameOver score={this.state.score}></GameOver>}

      </div>
    );
  }
}
export default App;