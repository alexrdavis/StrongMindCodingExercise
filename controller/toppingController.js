const PizzaTopping = require("../models/PizzaToppings")

module.exports = {
    getPizzaToppings: async(req, res) => {
        try {
            const toppings = await PizzaTopping.find()
            res.send(toppings)
        } catch(err) {
            console.error(err)
        }
    },
    createPizzaToppings: async(req, res) => {
        try {
            const toppings = await PizzaTopping.create({name: req.body.name})
            res.send(toppings)
        } catch(err) {
            console.error(err)
        }
    },
    deletePizzaToppings: async(req, res) => {
        try {
            await PizzaTopping.findByIdAndDelete({_id: req.params.id})
            res.json("Deleted topping with id " + req.params.id)
        } catch(err) {
            console.error(err)
        }
    },
    getOneTopping: async(req, res) => {
        try {
            const toppings = await PizzaTopping.findById({_id: req.params.id})
            res.json("Topping: " + toppings.name)
        } catch (err) {
            console.error(err)
        }
    },
    updatePizzaTopping: async(req, res) => {
        let topping
        try {
            topping = await PizzaTopping.findById(req.params.id)
            topping.name = req.body.name
            await topping.save()
            res.json("Topping updated " + topping.name)
        } catch (err) {
            console.error(err)
        }
    }
}