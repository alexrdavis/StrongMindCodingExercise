require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const toppingRouter = require('./routes/toppingsRoute')
const pizzaRouter = require('./routes/pizzaRoutes')

const mongoose = require('mongoose')

mongoose.connect(process.env.URL, { useNewUrlParser: true,useUnifiedTopology: true, dbName: 'PizzaDB' })
const db = mongoose.connection
db.on('error', err => { console.error('connection error:', err) })
db.once('open', _ => { console.log('Database connected') })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/toppings', toppingRouter)
app.use('/pizzas', pizzaRouter)

app.get("/", (req, res) => {
    res.send("Home page")
})

app.listen(port, () => {
    console.log("listening on " + port)
})