const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../models/user.model");

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header("x-token");
    //si el token esta en la consulta
    if (!token) {
        return res.status(401).json({
            msg: "Hace falta colocar el token"
        });
    }
    try {
        const payload = jwt.decode(token, procces.env.SECRET_KEY);
        const userFind = await User.findById(payload.uId);
        console.log(userFind);
    //verifica si no ha expirado la sesión
        if (payload.exp <= moment().unix()) {
            return res.status(500).send({ msg: "El tiempo de sesión ha expirado"});
        }
    //Verifica si el usuario es existente
        if (!userFind) {
            return res.status(401).json({
                msg: "Token invalido - el usuario no existe"
            });
        }

        req.user = userFind;
        next();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { validateJWT };