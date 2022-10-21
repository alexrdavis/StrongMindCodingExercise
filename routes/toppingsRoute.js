const express = require('express');
const toppingController = require('../controller/toppingController')
let app = express.Router();

// Get all pizza toppings
app.get('/', toppingController.getPizzaToppings)

// Get one pizza topping by id
app.get('/:id', toppingController.getOneTopping)

// Create new pizza topping
app.post('/', toppingController.createPizzaToppings)

// Update pizza topping by id
app.put('/:id', toppingController.updatePizzaTopping)

// Delete pizza topping by id
app.delete('/:id', toppingController.deletePizzaToppings)

module.exports = app