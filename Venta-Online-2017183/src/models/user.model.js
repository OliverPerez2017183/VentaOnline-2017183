'use strict'

const mongose = require("mongoose");
const Schema = mongose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: String,
});

module.exports = mongose.model('users', userSchema);