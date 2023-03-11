'use strict'

const { Router } = require("express");
const {
    createUser, 
    listUsers, 
    updateUser,
    deleteUser,
    loginUser,
    registClient,
} = require("../controllers/user.controller");
const {check} = require("express-validator");
const {validateParams} = require("../middlewares/validate-params");
const {validateJWT} = require("../middlewares/validate-jwt");
const api = Router();

module.exports = api;

//Rutas Usuarios
api.post("/create-user",
[
    validateJWT,
    check("username", "El username es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor de 2 digitos").isLength({
        min: 2,
    }),
    check("email", "El email es obligatorio").not().isEmpty(),
    validateParams,
],
createUser);
api.get("/listU", listUsers);
api.put("/updateU/:id",
[
    validateJWT,
    check("username", "El username es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor de 2 digitos").isLength({
        min: 2,
    }),
    check("email", "El email es obligatorio").not().isEmpty(),
    validateParams,
],
updateUser);
api.delete("/deleteU/:id", 
    [
        validateJWT,
        validateParams,
    ],
deleteUser);
api.post("/login", loginUser);
api.post("/RegisterC", registClient); 
