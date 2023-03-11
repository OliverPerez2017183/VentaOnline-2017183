'use strict'

const Carrito = require("../models/carrito.model");

const createCarrito = async(req, res)=> {
    try {
        let car = new Carrito(req.body);
        car = await car.save();
        res.status(200).send({
            msg: "Carrito agregado"
        });
    } catch (error) {
        throw new Error(error);
    }
};

const listCar = async(req, res) => {
    try{
        const car = await Carrito.find();
        res.status(200).send({ car: car });
    }catch(error){
        throw new Error(error);
    };
}

const addProduc = async(req, res) => {
    try {
        const id = req.params.id;
        const { idPro, precioProduct, cantidad} = req.body;

        let total = precioProduct * cantidad;

        const carPro = await Carrito.findByIdAndUpdate(
            id,
            {
                $push: {
                    products: {
                        idPro: idPro,
                        precioProduct: precioProduct,
                        cantidad: cantidad,
                        totalAPagar: total,
                    },
                },
            },
            { new: true }
        );
        if (!carPro) {
            return res.status(404).send({ msg: "Carrito no encontrado "});
        };
        return res.status(200).send({ carPro });
    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    createCarrito,
    listCar,
    addProduc,
};