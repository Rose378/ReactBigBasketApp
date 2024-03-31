const mongoose = require('mongoose');

//create a schema

let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    info: {
        type: String,
        required: true
    }

})

//create a table

let product = mongoose.model('product' , ProductSchema)
module.exports = product