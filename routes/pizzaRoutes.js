const express = require('express');
const pizzaController = require('../controller/pizzaController')
let app = express.Router();

// Get all pizzas
app.get('/', pizzaController.getPizzas)

// Get one pizza by id
app.get('/:id', pizzaController.getOnePizza)

// Create new pizza
app.post('/', pizzaController.createPizza)

// Update pizza by id
app.put('/:id', pizzaController.updatePizza)

// Delete pizza by id
app.delete('/:id', pizzaController.deletePizzas)

module.exports = app