import {React, useState, useEffect} from 'react';
import classes from "./Game.module.css";

const Game = (props) => {

    let [gameArray, updateGameArray] = useState([]);
    let [gameColor, updateGameColor] = useState('red');

    async function getTestGameState() {
        const response = await fetch('http://localhost:5000/game_test', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resp = await response.json();
        console.log(resp);
        return resp;
    }

    function getTile(color, index) {
        let color_style = ' ';
        if (color === 'blue') {
            color_style += classes.blue;
        }
        if (color === 'red') {
            color_style += classes.red;
        }
        return (
            <div className={classes.Elem + color_style} key={index}></div>
        )
    }

    function getColumn(array, index) {
        return (
            <div className={classes.Colon} key={index} onClick={() =>
                {
                    updateGameArray(
                        prev => {
                            const new_state = [...prev];
                            new_state[index] = [...new_state[index], gameColor];
                            return new_state;
                        }
                    );
                    updateGameColor(
                        prev => {
                            if (prev === 'red') {
                                return 'blue';
                            }
                            return 'red';
                        }
                    );
                }
            }>
                {array.map(e => getTile(e))}
            </div>
        )
    }
    if (gameArray.length === 0) {
        getTestGameState().then(
            resp => updateGameArray(resp.state)
        )
    }
    return (
        <div className={classes.GameField}>
            {gameArray.map((e, i) => getColumn(e, i))}
        </div>
    );
};

export default Game;