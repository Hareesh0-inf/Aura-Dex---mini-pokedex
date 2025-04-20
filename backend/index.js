const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;
var pokelist = [];
var offset = 0;
var limit = 20;

// Middleware
app.use(express.json());
app.use(cors());

var result;

// Routes

app.get('/', async (req, res) => {
    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        offset+=20;
        const body = await response.json();
        result = body;
        pokelist = pokelist.concat(result.results);
        res.send(JSON.stringify(pokelist));
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data from PokeAPI' });
    }
});

app.get('/info/:name',async(req,res)=>{
    var name = req.params.name;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(body => body.json());
    var dox = {
        abilities: response.abilities,
        height: response.height,
        name: response.name,
        type: response.types,
        weight: response.weight,
    };
    res.send(JSON.stringify(dox));
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});