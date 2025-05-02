const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    abilities: {
        type: Array,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: Array,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = {Pokemon};  