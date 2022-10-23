const Pizzas = require("../models/Pizzas")
const Toppings = require("../models/PizzaToppings")

module.exports = {
    getPizzas: async(req, res) => {
        try {
            const pizzas = await Pizzas.find()
            const toppings = await Toppings.find()
            res.render("pizzas.ejs", {pizzas: pizzas, toppings: toppings})
        } catch(err) {
            console.error(err)
        }
    },
    createPizza: async(req, res) => {
        try {
            let obj = req.body
            let toppingValue = Object.values(obj).slice(1)
            const pizzas = await Pizzas.create({name: (req.body.name).toLowerCase(), topping: toppingValue})
            res.redirect("/pizzas")
        } catch(err) {
            if(err.code == "11000") {
                res.send("<script> alert('Error: Duplicate entry'); window.location =  '/pizzas'; </script>")
            }
            res.status(400)
        }
    },
    deletePizzas: async(req, res) => {
        try {
            await Pizzas.findByIdAndDelete({_id: req.params.id})
            res.json("Deleted pizza with id " + req.params.id)
        } catch(err) {
            console.error(err)
        }
    },
    getOnePizza: async(req, res) => {
        try {
            const pizzas = await Pizzas.findById({_id: req.params.id})
            const toppings = await Toppings.find()
            res.json("Pizza: " + pizzas.name)
        } catch (err) {
            console.error(err)
        }
    },
    updatePizza: async(req, res) => {
        let pizza
        try {
            pizza = await Pizzas.findById(req.params.id)
            pizza.name = req.body.name
            await pizza.save()
            res.json("Topping updated " + pizza.name)
        } catch (err) {
            console.error(err)
        }
    }
}