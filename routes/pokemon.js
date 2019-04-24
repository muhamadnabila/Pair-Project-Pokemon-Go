const route = require('express').Router()
const {Pokemon , Trainer} = require('../models')

route.get('/',(req,res)=>{
    res.render('firstPokemon')
    
})

module.exports = route