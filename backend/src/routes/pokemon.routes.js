const express = require('express')
const { Pokemon } = require('../models/pokemon.model')
const {getAllmon, getmonbyName, getmonlist} = require('../controller/pokemon.controller')
const pokeRouter = express.Router()

pokeRouter.get('/',getAllmon)

pokeRouter.get('/allpoki', getmonlist)

pokeRouter.get('/info/:name', getmonbyName);

module.exports = pokeRouter;

