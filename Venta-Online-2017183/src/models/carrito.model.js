'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carritoSchema = Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'user',
    },
    products:[{
        idPro: {
            type: Schema.Types.ObjectId, ref: 'product',
        },
        precioProduct: Number,
        cantidad: Number,
        totalAPagar: Number,
    }],
});

module.exports = mongoose.model('carrito', carritoSchema);