const express = require('express');
const cors = require('cors')
const pokeRouter = require('./routes/pokemon.routes')


const app = express();
app.use(express.json());
app.use(cors());

app.use('/mons',pokeRouter);

module.exports = app
