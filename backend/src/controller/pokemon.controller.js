var pokelist = [];
var offset = 0;
var limit = 20;

async function getAllmon(req,res) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(body => body.json());
    var result = response.results.map(e => e.name);
    result = JSON.stringify(result);
    console.log(result)
    res.status(200).send(result)
}

async function getmonbyName(req, res) {
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
}

async function getmonlist(req, res){
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
}

module.exports = {getAllmon, getmonbyName, getmonlist};