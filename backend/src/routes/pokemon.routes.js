const express = require('express')
const {getAllmon, getmonbyName, getmonlist} = require('../controller/pokemon.controller')
const pokeRouter = express.Router()

pokeRouter.get('/', getmonlist) 
pokeRouter.get('/allpoki', getAllmon) 
pokeRouter.get('/info/:name', getmonbyName);

module.exports = pokeRouter;

