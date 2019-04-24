const route = require('express').Router()
const { Pokemon, Trainer } = require('../models')

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/trade',(req,res)=>{
    Trainer.findByPk(1,{
        include : Pokemon
    })
    .then(trainer =>{
        res.render('trade',{trainer})
    })
    .catch(e=>{
        res.send(e)
    })
})
// req.session.login
// req.session.trainerId


// req.session.pokemonId

route.get('/trade/:id',(req,res)=>{
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
            res.redirect('/')
        })
        .catch(err => {
            res.redirect(`/trainer/register?error=${err.message}`)
        })
})

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

route.get('/myPokemon', (req,res)=>{
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