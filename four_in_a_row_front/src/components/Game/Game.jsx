import {React, useState} from 'react';
import classes from "./Game.module.css";

const Game = (props) => {

    let [gameArray, updateGameArray] = useState([[],[],[],[],[],[]]);
    let [gameColor, updateGameColor] = useState('red');

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


    return (
        <div className={classes.GameField}>
            {gameArray.map((e, i) => getColumn(e, i))}
        </div>
    );
};

export default Game;