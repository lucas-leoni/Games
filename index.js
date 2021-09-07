const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const DB = {
    games: [
        {id: 123, name: 'Halo 4', year: 2012, price: 120},
        {id: 92, name: 'Dino Crisis', year: 2009, price: 60},
        {id: 93, name: 'Metal Gear Solid', year: 1999, price: 20}
    ]
}

app.get('/', (req, res) => {
    res.json('Ops, não existe dados na rota "/"');
})

app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/games/:id', (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.send('Ops, o ID informado não é numérico!')
    } else {
        const idGame = parseInt(req.params.id);
        const game = DB.games.find(index => index.id === idGame);
        if(game !== undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
})

app.listen(5000, () => {
    console.log('app running in http://localhost:5000');
});