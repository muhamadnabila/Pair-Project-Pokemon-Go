const express = require('express')
const app = express()
const port = 9000
const index = require('./routes/index')
const trainer = require('./routes/trainer')
const pokemon = require('./routes/pokemon')
const session = require('express-session')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

app.use(session({
    secret: 'pokemon',
    cookie: {}
}))

app.use('/', index)
app.use('/pokemon', pokemon)
app.use('/trainer', trainer)

app.listen(port, (req, res) => {
    console.log(`You are listening to ${port} FM`)
})