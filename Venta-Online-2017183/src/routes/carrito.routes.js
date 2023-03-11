'use strict'

const { Router } = require("express");
const { createCarrito, addProduc, listCar, } = require("../controllers/carrito.controller");

const api = Router();

//Agregar Carrito
api.post("/createCar", createCarrito);
api.put("/addPro/:id", addProduc);
api.get("/listCar", listCar);

module.exports = api;