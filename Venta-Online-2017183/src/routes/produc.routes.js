'use strict'

const { Router } = require("express");
const {
    createProduct, 
    listProducts, 
    searchProduct, 
    updateProduct, 
    deleteProduct,
    masV,
    deleteCategory,
    addCategory,
    editCategory,
    soldOut,
    searchCategory,
}= require("../controllers/product.controller");

const api = Router();

//Rutas Productos
api.post("/createPro", createProduct);
api.get("/listPro", listProducts);
api.put("/updatePro/:id", updateProduct);
api.delete("/deletePro/:id", deleteProduct);
//Buscar un Producto por su descripción
api.post("/searchPro", searchProduct);
//Productos más vendidos
api.get("/more", masV);
//Productos Agotados
api.get("/soldOut", soldOut);

//Rutas Categorias
api.put("/add-category/:id", addCategory);
api.delete("/delete-category/:id", deleteCategory);
api.put("/update-category/:id", editCategory);
api.post("/search", searchCategory)

module.exports = api;