const express = require('express')
const { Pokemon } = require('../models/pokemon.model')
const {getAllmon, getmonbyName, getmonlist} = require('../controller/pokemon.controller')
const pokeRouter = express.Router()

pokeRouter.get('/', getmonlist) // Main route should return Pokémon with URLs
pokeRouter.get('/allpoki', getAllmon) // This should return all Pokémon names

pokeRouter.get('/info/:name', getmonbyName);

module.exports = pokeRouter;

