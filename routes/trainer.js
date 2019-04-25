const route = require('express').Router()
const { Pokemon, Trainer } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/trade', (req, res) => {
    Trainer.findByPk(1, {
        include: Pokemon
    })
        .then(trainer => {
            res.render('trade', { trainer })
        })
        .catch(e => {
            res.send(e)
        })
})

route.get('/trade/:id', (req, res) => {
    let idPokemon = req.params.id
    let idTrainer =
        res.redirect('/trainer/trade')
})
route.get('/register', (req, res) => {
    res.locals.err = req.query.error
    res.render('register')
})

route.post('/register', (req, res) => {
    Trainer.create(req.body)
        .then(() => {
            res.redirect(`/trainer/login?username=${req.body.username}`)
        })
        .catch(err => {
            res.redirect(`/trainer/register?error=${err.message}`)
        })
})

route.get('/login', (req, res) => {
    res.locals.err = req.query.error
    res.locals.username = req.query.username
    res.render('login')
})

route.post('/login', (req, res) => {
    Trainer.findOne({
        where:
        {
            username: req.body.username,
            password: req.body.password
        }
    })
        .then(trainer => {
            if (trainer) {
                req.session.login = true
                req.session.trainerId = trainer.id
                Pokemon.findAll({ where: { TrainerId: trainer.id } })
                    .then(myPokemons => {
                        if (myPokemons.length == 0) res.render('myFirstPokemon')
                        else res.redirect('/')
                    })
            }
            else throw new Error(`Account not found :(`)
        })
        .catch(err => {
            res.redirect(`/trainer/login?error=${err.message}`)
        })
})

route.get('/logout', (req, res) => {
    delete req.session.trainerId
    delete req.session.login
    res.redirect('/trainer/register')
})

route.get('/myPokemon', (req, res) => {
    if (req.session.login) res.locals.login = req.session.login
    else res.locals.login = false
    if (req.session.trainerId) res.locals.trainerId = req.session.trainerId
    else req.session.trainerId = null
    Pokemon.findAll({
        where: {
            TrainerId: req.session.trainerId
        },
        order: ['id']
    })
        .then(pokemons => {
            res.render('myPokemon', { pokemons })
        })
        .catch(err => {
            res.redirect('lala')
        })
})

route.get('/wilds/:pokemonId', (req, res) => {
    let myPokemon = Pokemon.findOne({ where: { id: req.params.pokemonId } })
    let pokemon = Pokemon.findAll({ where: { TrainerId: null } })
    Promise.all([myPokemon, pokemon])
        .then(([myPokemon, pokemon]) => {
            pokemon = pokemon[Math.floor(Math.random() * pokemon.length)]
            res.render('intoTheWilds', { pokemon, myPokemon })
        })
        .catch(err => {
            res.send('error wilds')
        })
})

route.get('/starter', (req, res) => {
    let choice = req.query.choice
    Pokemon.findOne({ where: { species: choice } })
        .then(pokemon => {
            return Pokemon.create({
                level: pokemon.level,
                species: pokemon.species,
                type: pokemon.type,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defence: pokemon.defence,
                speed: pokemon.speed,
                experience: 0,
                TrainerId: req.session.trainerId,
                image: pokemon.image,
                backImage: pokemon.backImage
            })
        })
        .then(() => {
            res.redirect('/trainer/myPokemon')
        })
        .catch(err => {
            res.send(err)
        })
})

route.get('/catch/:myPokemonId/:pokemonId', (req, res) => {
    let myPokemon = Pokemon.findOne({ where: { id: req.params.myPokemonId } })
    let pokemon = Pokemon.findOne({ where: { id: req.params.pokemonId } })
    Promise.all([myPokemon, pokemon])
        .then(([myPokemon, pokemon]) => {
            let updatePokemon = myPokemon.update({ experience: myPokemon.experience + 15 }, {experience: 15})
            let createPokemon = Pokemon.create({
                level: pokemon.level,
                species: pokemon.species,
                type: pokemon.type,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defence: pokemon.defence,
                speed: pokemon.speed,
                experience: 0,
                TrainerId: req.session.trainerId,
                image: pokemon.image,
                backImage: pokemon.backImage
            })
            return Promise.all([updatePokemon, createPokemon])
        })
        .then(([updatePokemon, createPokemon]) => {
            res.redirect('/trainer/myPokemon')
            // res.send(`successfully catched ${createPokemon.species}!`)
        })
        .catch(err => {
            res.send(err)
        })
})

route.get('/test', (req, res) => {
    
    Pokemon.findAll({
        where: {
            species: {
                [Op.like]: 'squirt%'
            }
        }
    })
        .then(pokemons => {
            res.send(pokemons)
        })
        .catch(err =>{
            res.send(err)
        })
})

route.get('/battle/:myPokemonId', (req,res)=>{
    Pokemon.findByPk(req.params.myPokemonId)
    .then(pokemon =>{
        return pokemon.update({experience: pokemon.experience + 25},{
            experience: 25
        })
    })
    .then(pokemon=>{
        res.render('newPokemon', {pokemon})
        // res.send(`${pokemon} gained experience!`)
    })
    .catch(err =>{
        res.send(err)
    })
})

route.get('/name/:pokemonId', (req,res)=>{
    Pokemon.findByPk(req.params.pokemonId)
    .then(pokemon =>{
        res.render('giveName', {pokemon})
    })
})

route.post('/name/:pokemonId', (req,res)=>{
    Pokemon.findByPk(req.params.pokemonId)
    .then(pokemon =>{
        return pokemon.update({name: req.body.name})
    })
    .then(pokemon =>{
        res.redirect('/trainer/myPokemon')
    })
    .catch(err =>{
        res.send(err)
    })
})

module.exports = route