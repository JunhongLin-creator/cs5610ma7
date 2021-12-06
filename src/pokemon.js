const express = require('express');
const router = express.Router();
const { v4: uuid, v4 } = require('uuid');

// replace this string with your full name
const name = "Junhong Lin"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res) {
    res.send(myPokemon);
});

router.post('/', (req, res) => {
    // if the pokemon name already exists in the list, return an error
    // randomly generate an id using UUID ["uuid()"]
    // randomly generate a level between 1 and 10, inclusive, if none is given
    // randomly generate a health between 10 and 100, inclusive, if none is given
    // insert your pokemon into the myPokemon list
    // return a 200
    let {name,level,health} = req.body;
    let foundPokemon = false;
    for (const Pokemon of myPokemon) {
        if(name===Pokemon.name){
            foundPokemon = true;
            break;
        }
    }
    if(foundPokemon){
        res.status(404).send({error:'Pokemon name already exists!'});
        return;
    }
    const newId = new uuid();
    if(level==undefined){
        level = Math.floor(Math.random()*10+1);
    }
    if(health==undefined){
        health = Math.floor(Math.random()*91+10);
    }
    const newPokemon = {
        id:newId,
        name:myName,
        health:health,
        level:level
    }
    myPokemon.push(newPokemon);
    res.status(200).send("Succuess!")
});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    const {id} = req.body;
    let foundPokemon = false;
    let result = null;
    for (const Pokemon of myPokemon) {
        if(Pokemon.id ===id){
            foundPokemon=true;
            result = Pokemon;
            break;
        }
    }
    if(foundPokemon){
        res.send(result);
    }else{
        res.status(404).send("No pokemon matches the pokemonId.")
    }
});

router.put('/:pokemonId', function(req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    // return a 404 if no pokemon matches that pokemonId 
    const {id,name,health,level} = req.body;
    let foundPokemon = false;
    let result = null;
    for (const Pokemon of myPokemon) {
        if(Pokemon.id ===id){
            foundPokemon=true;
            Pokemon.name = name;
            Pokemon.health = health;
            Pokemon.level = level;
            break;
        }
    }
    if(foundPokemon){
        res.send("Succuess!");
    }else{
        res.status(404).send("No pokemon matches the pokemonId.")
    }
})

router.delete('/:pokemonId', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    // return 200 even if no pokemon matches that Id
    const {id,name,health,level} = req.body;
    let result = [];
    for (const Pokemon of myPokemon) {
        if(Pokemon.id ===id){
            continue;
        }
        result.push(Pokemon);
    }
    res.status(200).send("Succuess!")
})

module.exports = router;