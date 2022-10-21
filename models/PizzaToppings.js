const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('PizzaToppings', schema)