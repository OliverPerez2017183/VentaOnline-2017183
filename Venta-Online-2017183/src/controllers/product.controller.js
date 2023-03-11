'use strict'

const Product = require("../models/product.model");
const User = require("../models/user.model");

const createProduct = async (req, res) => {
   if (req.User.rol === 'ADMIN') {
    const { description } = req.body;
    try {
        let product = new Product(req.body);
        product = await product.save();

        res.status(200).json({
            msg: `Producto ${description} creado correctamente`,
            ok: true,
            producto: product,
        })
    } catch (error) {
        throw new Error(error);
    }
   } else {
        return res.status(500).send({
        msg: "Este usuario no tiene permisos para crear más usuarios"
      });
   }
    
};

const listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        
        if (!products) {
            res.status(404).send({ msg: "No hay productos en la base de datos."});
        }else{
            res.status(200).json({ productos: products});
        }
    } catch (error) {
        throw new Error(error);
    }
};

const updateProduct = async(req, res) => {
    if (req.User.rol === 'ADMIN') {
        try {
        
            const id = req.params.id;
            const editProduct = {...req.body };
            const productUp = await Product.findByIdAndUpdate(id, editProduct, {
                new: true,
            });
            if (productUp) {
                return res.status(200).send({
                    msg: "Producto actualizado de manera correcta.",
                    productUp,
                });
            } else {
                return res.status(404).send({
                    msg: "El producto no esta registrado en la base de datos."
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return res.status(500).send({
        msg: "Este usuario no tiene permisos para crear más usuarios"});
    }
};

const deleteProduct = async(req, res) => {
    if (req.User.rol === 'ADMIN') {
        try {
            const id = req.params.id;
            const productDelete = await Product.findByIdAndDelete(id);
            return res.status(200).json({ msg: "Producto eliminado de manera correcta."});
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return res.status(500).send({
        msg: "Este usuario no tiene permisos para crear más usuarios"});
    }
};

//Función buscar un producto por su nombre
const searchProduct = async (req, res) => {
    try {
        //El nombre del producto que queremos buscar 
        let params = {
            description: req.body.description
        }
        let dProduct = await Product.find({
            description: {
                $regex: params.description,
                $options: 'i'
            }
        }).populate();//Populate busca coincidencias de cadenas de texto
        return res.send({dProduct})
    } catch (error) {
        throw new Error(error);
    }
};

//lISTAR MAS VENDIDOS
const masV = async (req, res) => {
    try {
        let mProd = await Product.find().sort({
            sold: -1
        });
        
        return res.status(200).send({"Productos más vendidos": mProd });
    } catch (error) {
        throw new Error(error);
    }
};

//Productos agotados
const soldOut = async (req, res) => {
    try {
        const soldsOut = await Product.find({
            stock:{
                //Busca dentro del arreglo registros con el valor de 0
                $in : [0]
            }},
            {
                //los datos que se listan; 1(muestro los datos), 0(No los muestra)
              
                description: 1,
                _id: 0,
            }
            );

        if (!soldsOut) {
            return res.status(404).send({ msg: "No hay productos agotados "});
        }else{
            return res.status(200).send({ "Productos agotados": soldsOut })
        }
    } catch (error) {
        throw new Error(error);
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CRUD Categorias

const addCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { nameCategory } = req.body;
        
        const proCat = await Product.findByIdAndUpdate(
            id,
            {
                $push: {
                    category: {
                        nameCategory: nameCategory,
                    },
                },
            },
            { new: true }
        );
        if(!proCat) {
            return res.status(404).send({ msg: "Producto no encontrado"});
        };
        return res.status(200).send({ proCat })
    } catch (error) {
        throw new Error(error);
    }
};

const editCategory = async(req, res) => {
    const id = req.params.id;
    let { idCategory, nameCategory } = req.body;
    try {
        const updateCat = await Product.updateOne(
            {_id: id, "category._id": idCategory},
            {
                $set: {
                    "category.$.nameCategory": nameCategory,
                },
            },
            { new: true }
        );

        if(!updateCat) return res.status(404).send({ msg: "Esta Categoría no existe "});

        return res.status(200).send({ updateCat, msg: "Categoría actualizada correctamente" });
    } catch (error) {
        throw new Error(error);
    }
}; 

const deleteCategory = async(req, res) => {
    const id = req.params.id;
    let { idCategory } = req.body;
    try {
        const deleteCatego = await Product.updateOne(
            {_id: id, "category._id": idCategory},
            {
                $pull:{
                    category:{
                        _id: idCategory
                    }},
            },
            {new: true, multi:false}
        );
        if(!deleteCatego){
            return res.status(404).send({
                msg:"Esta categoria no existe dentro de la base de datos"
            });
        }
        return res.status(200).send({deleteCatego});
    } catch (error) {
        throw new Error(error);
    }
};

const searchCategory = async (req, res) => {
    try {
        let params = {
            nameCategory: req.body.nameCategory
        }
        let dProduct = await Product.find({
            category: {
                nameCategory: {$regex: params.description,
                $options: 'i'
            }
            }}).populate();//Populate busca coincidencias de cadenas de texto}
        return res.send({dProduct})
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createProduct, 
    listProducts, 
    updateProduct,
    deleteProduct,
    searchProduct,
    masV,
    soldOut,
    //Categorias
    addCategory,
    editCategory,
    deleteCategory,
    searchCategory,
};
