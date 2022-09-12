import express from 'express'
import {v4 as uuidv4} from 'uuid';

import cors from 'cors'

const app = express();

const PORT = 5000;

const games = {};

function Message(message) {
    return {
        message
    }
}

app.use(express.json());

app.use(cors());

app.listen(PORT, () => console.log('s'))


app.get('/games', (req, res) => {
    res.status(200).json({
        games
    });
})

app.post('/game_test', (req, res) => {
    console.log(req.body);
    res.status(200).json({
        state: [['red', 'red', 'red'], [], ['blue', 'blue'], [], [], []],
        blue_user_id: 'blue_user_id',
        red_user_id: 'red_user_id',
        move: 'red'
    });
})


app.post('/game', (req, res) => {
    console.log(req.body);
    const game_id = uuidv4();
    const user_id = req.body.user_id;
    games[game_id] = {
        id: game_id,
        state: [[], [], [], [], [], []],
        blue_user_id: user_id,
        red_user_id: null,
        move: 'red'
    };


    res.status(200).json({
        'id': game_id,
        'game': games[game_id]
    });

})

app.put('/join', (req, res) => {
    console.log('JOIN GAME', req.body)
    const user_id = req.body.user_id;
    const game_id = req.body.game_id;

    const game = games[game_id];
    if (!game) {
        res.status(400).json(Message('No game found'));
        return;
    }

    game.red_user_id = user_id;
    res.status(200).json(game);
})

app.put('/game', (req, res) => {

    const game_id = req.body.game_id;
    const game = games[game_id];
    if (!game) {
        res.status(400).json(Message('No game found'));
        return;
    }
    console.log(game);
    res.status(200).json(game);
})


app.post('/move', (req, res) => {
    console.log('MAKE MOVE:', req.body);
    const game_id = req.body.game_id;
    const user_id = req.body.user_id;
    const move = req.body.move;
    const game = games[game_id];

    if (!game) {
        res.status(400).json(Message('No game found'));
        return;
    }

    if (user_id === game.blue_user_id) {
        if (game.move !== 'blue') {
            res.status(400).json(Message('Wrong order'));
            return;
        }
    }


    if (user_id === game.red_user_id) {
        if (game.move !== 'red') {
            res.status(400).json(Message('Wrong order'));
            return;
        }

    }

    if (game.move === 'red') {
        game.state[move].push('red');
        game.move = 'blue';
    } else if (game.move === 'blue') {
        game.state[move].push('blue');
        game.move = 'red';
    }
    console.log(game);
    res.status(200).json(game);
})