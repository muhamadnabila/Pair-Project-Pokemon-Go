const route = require('express').Router()
const { Pokemon, Trainer, Lelang } = require('../models')
const isAuth = require('../middlewares/isAuth')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

route.get('/', (req, res) => {
    res.render('index')
})
// --------- trade -----------
route.get('/trading', isAuth, (req, res) => {
    res.render('trading')
})
route.get('/trade', isAuth, (req, res) => {
    let trainer = Trainer.findByPk(req.session.trainerId, {
        include: Pokemon
    })
    let lelang = Lelang.findAll(
        {
            include: ['PokemonUser']
        }
    )
    let pokemon = Pokemon.findAll()
    Promise.all([trainer, lelang, pokemon])
        .then(data => {
            let temp = []
            data[1].forEach(el => {
                if (el.PokemonIdFriend !== null) {
                    temp.push(el.PokemonIdFriend)
                }
            })
            let poke = []
            data[2].forEach(elPoke => {
                temp.forEach(elTemp => {
                    if (elTemp == elPoke.id && elPoke.TrainerId == data[0].id) {
                        poke.push(elPoke)
                    }
                })
            });
            res.render('trade', { trainer: data[0], lelang: data[1], pokeReq: poke })
        })
        .catch(e => {
            res.send(e)
        })
})

route.get('/trade/viewDetail/:idPokemonUser', (req, res) => {
    Lelang.findAll({
        where: {
            PokemonIdUser: req.params.idPokemonUser
        },
        include: ['PokemonFriend']
    })
        .then(data => {
            res.render('viewDetailRequest', { data, idPokemon: req.params.idPokemonUser })
        })
})
route.get('/trade/viewDetail/acc/:idPokemonFriend/:idPokemonUser/:idFriend', (req, res) => {
    Pokemon.findByPk(req.params.idPokemonFriend)
        .then(data => {
            return data.update({
                TrainerId: req.session.trainerId,

            },
                { PokemonIdUser: req.params.idPokemonUser })
        }).then(() => {
            return Pokemon.findByPk(req.params.idPokemonUser)
        })
        .then((data) => {
            return data.update({
                TrainerId: req.params.idFriend
            })
        })
        .then(() => {
            res.redirect('/trainer/trade')
        })
})
route.get('/trade/:id', (req, res) => {
    let PokemonId = req.params.id

    Lelang.create({
        PokemonIdUser: PokemonId,
        PokemonIdFriend: null,
        TrainerId: req.session.trainerId
    }, {
            PokemonId: PokemonId
        })
        .then(() => {
            res.redirect('/trainer/trade')
        })
        .catch(e => {
            res.send(e)
        })
})
route.get('/bid', (req, res) => {
    Lelang.findAll({
        include: ['PokemonUser']
    })
        .then(trade => {
            res.render('bid', { trade, TrainerId: req.session.trainerId })
        })
})
route.get('/bid/:PokemonIdUser/:TradeId', (req, res) => {
    Trainer.findByPk(req.session.trainerId, {
        include: Pokemon
    })
        .then(trainer => {
            res.render('pokemonOptionBid', { trainer, PokemonIdUser: req.params.PokemonIdUser, TradeId: req.params.TradeId })
        })
        .catch(e => {
            res.send(e)
        })
})
route.get('/bid/:PokemonIdUser/:PokemonIdFriend/:TradeId', (req, res) => {
    Lelang.findByPk(req.params.TradeId)
        .then(trade => {
            return Lelang.create({
                PokemonIdUser: trade.PokemonIdUser,
                PokemonIdFriend: req.params.PokemonIdFriend,
                TrainerId: trade.TrainerId
            })
        })
        .then(() => {
            res.redirect('/trainer/bid')
        })
        .catch(err => {
            res.send(err)
        })
})
// ---------register----------
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
// ----------login-------------
route.get('/login', (req, res) => {
    res.locals.err = req.query.error
    res.locals.username = req.query.username
    res.render('login')
})

route.post('/login', (req, res) => {
    Trainer.findOne({
        where:
        {
            username: req.body.username
        }
    })
        .then(trainer => {
            let checkPassword = trainer.comparePass(req.body.password) 
            if (checkPassword) {
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

// --------my pokemon --------------
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
            let updatePokemon = myPokemon.update({ experience: myPokemon.experience + 15 }, { experience: 15 })
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
        .catch(err => {
            res.send(err)
        })
})

route.get('/battle/:myPokemonId', (req, res) => {
    Pokemon.findByPk(req.params.myPokemonId)
        .then(pokemon => {
            return pokemon.update({ experience: pokemon.experience + 25 }, {
                experience: 25
            })
        })
        .then(pokemon => {
            res.render('newPokemon', { pokemon })
        })
        .catch(err => {
            res.send(err)
        })
})

route.get('/name/:pokemonId', (req, res) => {
    Pokemon.findByPk(req.params.pokemonId)
        .then(pokemon => {
            res.render('giveName', { pokemon })
        })
})

route.post('/name/:pokemonId', (req, res) => {
    Pokemon.findByPk(req.params.pokemonId)
        .then(pokemon => {
            return pokemon.update({ name: req.body.name })
        })
        .then(pokemon => {
            res.redirect('/trainer/myPokemon')
        })
        .catch(err => {
            res.send(err)
        })
})

route.get('/profile',(req,res)=>{
    Trainer.findByPk(req.session.trainerId)
    .then(data =>{
        res.render('profile',{data})
    })
})
module.exports = route