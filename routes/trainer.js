const route = require('express').Router()
const {Pokemon , Trainer} = require('../models')

route.get('/',(req,res)=>{
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
module.exports = route