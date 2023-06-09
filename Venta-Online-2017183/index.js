'use strict'
const express = require("express");
const app = express();
const { connection } = require("./src/database/connection");
require("dotenv").config();
const port = process.env.PORT;
const croutes = require("./src/routes/user.routes")
const routes = require("./src/routes/produc.routes");
const proutes = require("./src/routes/carrito.routes");

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});
connection();

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.use("/api", routes);
app.use("/api", croutes);
app.use("/api", proutes);

