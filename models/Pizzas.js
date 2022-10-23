const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    topping: {
        type: Array,
        unique: false
    }
})

module.exports = mongoose.model('Pizzas', schema)