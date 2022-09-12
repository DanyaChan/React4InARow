import {React, useState, useRef} from 'react';
import classes from "./Game.module.css";


const Game = (props) => {

    let [gameArray, updateGameArray] = useState([]);
    let [gameId, updateGameId] = useState(null);
    let inputState = useRef(null);

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
            <div className={classes.Colon} key={index} onClick={createMover(index)}>
                {array.map(e => getTile(e))}
            </div>
        )
    }

    async function fetchNewGame() {
        const response = await fetch('http://localhost:5000/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': props.user_id
            })
        });
        const resp = await response.json();
        console.log(resp);
        return {...resp, 'status': response.status};
    }

    function createNewGame() {
        fetchNewGame().then(
            (resp) => {
                updateGameArray(resp.game.state);
                updateGameId(resp.id);
                subscribeToAGame(resp.id);
            }
        )
    }

    async function fetchJoinGame() {
        const response = await fetch('http://localhost:5000/join', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'game_id': inputState.current.value,
                'user_id': props.user_id
            })
        });
        const resp = await response.json();
        console.log(resp);
        return {...resp, 'status': response.status};
    }

    function joinGame() {
        fetchJoinGame().then(
            (resp) => {
                if (resp.status !== 200) {
                    alert('ERROR:' + resp.message);
                    return;
                }
                updateGameId(resp.id);
                updateGameArray(resp.state);
                subscribeToAGame(resp.id);
            }
        )
    }

    function createMover(index) {
        return () => {
            makeMove(index);
        }
    }

    async function fetchMakeMove(index) {
        const response = await fetch('http://localhost:5000/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'game_id': gameId,
                'user_id': props.user_id,
                'move' : index
            })
        });
        const resp = await response.json();
        console.log(resp);
        return {...resp, 'status': response.status};
    }

    function makeMove(index) {
        fetchMakeMove(index).then(
            (resp) => {
                if (resp.status !== 200) {
                    alert('ERROR:' + resp.message);
                    return;
                }
                updateGameId(resp.id);
                updateGameArray(resp.state);
            }
        )
    }

    async function fetchGameState(game_id) {
        const response = await fetch('http://localhost:5000/game', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'game_id': game_id,
            })
        });
        const resp = await response.json();
        console.log(resp);
        return {...resp, 'status': response.status};
    }

    function getGameState(game_id) {
        fetchGameState(game_id).then(
            (resp) => {
                if (resp.status !== 200) {
                    alert('ERROR:' + resp.message);
                    return;
                }
                updateGameArray(resp.state);
            }
        )
    }

    function subscribeToAGame(game_id) {
        setInterval(() => getGameState(game_id), 100);
    }

    return (
        <div className={classes.Main}>
            <div className={classes.GameField}>
                {gameArray.map((e, i) => getColumn(e, i))}
            </div>
            <input placeholder={'Game id'} ref={inputState} type={'text'}/>
            <button onClick={joinGame}> Join</button>
            <button onClick={createNewGame}> Create new</button>
            <p>Game id: {gameId}</p>
        </div>
    );
};

export default Game;