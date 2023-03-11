'use strict'
require('dotenv').config();
const database=process.env.DATABASE;
const moongose = require("mongoose");
moongose.set("strictQuery", true);

const connection = async() => {
    try {
        await moongose.connect(database);
        console.log("Conectado correctamente a la base de Datos! ;D");
    } catch (err) {
        throw new Error('Error al iniciar la base de datos '+ err);
    }
};

module.exports = {
    connection,
};