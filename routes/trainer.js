const route = require('express').Router()
const { Pokemon, Trainer, Lelang } = require('../models')
const isAuth = require('../middlewares/isAuth')

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
            // res.send(data)
            let temp = []
            data[1].forEach(el => {
                if (el.PokemonIdFriend !== null) {
                    temp.push(el.PokemonIdFriend)
                }
            })
            // console.log(temp)
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
            // res.send(data)
            res.render('viewDetailRequest', { data, idPokemon: req.params.idPokemonUser })
        })
})
route.get('/trade/viewDetail/acc/:idPokemonFriend/:idPokemonUser/:idFriend', (req, res) => {
    // res.send(req.params.idPokemonUser)
    // res.send(req.session)
    Pokemon.findByPk(req.params.idPokemonFriend)
        .then(data => {
            return data.update({
                TrainerId: req.session.trainerId,
                
            },
                { PokemonIdUser: req.params.idPokemonUser })
        }).then(() => {
            return Pokemon.findByPk(req.params.idPokemonUser)
        })
        .then((data)=>{
            return data.update({
                TrainerId : req.params.idFriend 
            })
        })
        .then(()=>{
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
        .catch(e =>{
            res.send(e)
        })
})
route.get('/bid', (req, res) => {
    Lelang.findAll({
        include: ['PokemonUser']
    })
        .then(trade => {
            // res.send({trade,trainerId : req.session.trainerId})
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
            res.redirect('/')
        })
        .catch(err => {
            res.redirect(`/trainer/register?error=${err.message}`)
        })
})
// ----------login-------------
route.get('/login', (req, res) => {
    res.locals.err = req.query.error
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
                res.redirect('/')
            }
            else throw new Error(`Account not found :(`)
        })
        .catch(err => {
            res.redirect(`/trainer/login?error=${err.message}`)
        })
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
        }
    })
        .then(pokemons => {
            res.render('myPokemon', { pokemons })
        })
        .catch(err => {
            res.send('lala')
        })
})

module.exports = route