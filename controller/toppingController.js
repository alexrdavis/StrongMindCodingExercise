const PizzaTopping = require("../models/PizzaToppings")

module.exports = {
    getPizzaToppings: async(req, res) => {
        try {
            const toppings = await PizzaTopping.find()
            res.render("toppings.ejs", {toppings:toppings})
            res.status(200)
        } catch(err) {
            console.error(err)
        }
    },
    createPizzaToppings: async(req, res) => {
        try {
            await PizzaTopping.create({name: (req.body.name).toLowerCase()})
            res.status(200)
            res.redirect("/toppings")
        } catch(err) {
            if(err.code == "11000") {
                res.send("<script> alert('Error: Duplicate entry'); window.location =  '/toppings'; </script>")
            }
            res.status(400)
        }
    },
    deletePizzaToppings: async(req, res) => {
        try {
            await PizzaTopping.findByIdAndDelete({_id: req.params.id})
            res.status(200)
            res.json("Deleted topping with id " + req.params.id)
        } catch(err) {
            console.error(err)
        }
    },
    getOneTopping: async(req, res) => {
        try {
            const topping = await PizzaTopping.findById({_id: req.params.id})
            res.render("updateTopping.ejs", {topping:topping})
        } catch (err) {
            console.error(err)
        }
    },
    updatePizzaTopping: async(req, res) => {
        let topping
        try {
            topping = await PizzaTopping.findById(req.params.id)
            topping.name = (req.body.name).toLowerCase()
            await topping.save()
            res.redirect("/toppings")
        } catch (err) {
            if(err.code == "11000") {
                res.send("<script> alert('Error: Duplicate entry'); window.location =  '/toppings'; </script>")
            }
            res.status(400)
        }
    }
}