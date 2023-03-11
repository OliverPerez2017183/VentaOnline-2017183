'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    description: String,
    brand: String,
    price: Number,
    stock: Number,
    sold: Number,
    category: [{
       nameCategory: String,      
       required: false,
    }]
});

module.exports = mongoose.model('products', productSchema);