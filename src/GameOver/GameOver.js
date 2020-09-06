import React from 'react';
import './GameOver.css';

const closeHandler = () => {
    window.location.reload();
};

const GameOver = (props) => {
    return (
        <div id="overlay">
            <div className="gameover">
                <h2>Game Over</h2>
                <p>Your final score: <span> {props.score} </span> </p>
                <button onClick={closeHandler} className="closebutton">Close</button>
            </div>
        </div>
    )
}


export default GameOver;