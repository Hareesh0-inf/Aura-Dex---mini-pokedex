const express = require('express');
const cors = require('cors')
const pokeRouter = require('./routes/pokemon.routes');
const { userRouter } = require('./routes/user.route');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/mons',pokeRouter);
app.use('/user',userRouter);

module.exports = app
