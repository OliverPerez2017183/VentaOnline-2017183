'use strict'
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/createe-jwt");
const jwt = require("jsonwebtoken")

//Create Read Update Delete 

const createUser = async (req, res) => {
    if (req.User.rol === "ADMIN") {
        const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email});
        if (user) {
            return res.status(400).send({
                msg: "Un usuario ya esta registrado con este correo.",
                ok: false,
                user: user,
            });
        }

        user = new User(req.body);

        const jumps = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, jumps);

        user = await user.save();
        
       //const token = await generateJWT(user.id, user.username, user.email);
        res.status(200).send({
            msg: `El usuario ${user.username} creado correctamente`,
            user,
            //token: token,
        })
    } catch (error) {
        throw new Error(error);
    }
    }else{
        return res.status(500).send({
          msg: "Este usuario no tiene permisos para crear más usuarios"
        });
    };
};

const listUsers = async (req, res) => {
    if (req.User.rol === "ADMIN") {
    try {
        const users = await User.find();

        if(!users){
            res.status(404).json({ msg: "No hay usuarios registrados. "});
        }else{
            res.status(200).send({ usuarios: users });
        }
    } catch (error) {
        throw new Error(error);
    }
    }else{
        return res.status(500).send({
            msg: "Este usuario no tiene permisos para crear más usuarios"
        });
};
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userEdit = { ...req.body };
        //No eliminar un Usuario ADMIN
        if((existUserId.role == 'ADMIN') && (userToken !== id)) return res.send({message: 'no puede aliminar un admin'});
        userEdit.password = userEdit.password
        ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
        : userEdit.password;
        const userComplete = await User.findByIdAndUpdate(id, userEdit, {
            new: true,
        });
        if (userComplete) {
            const token = await generateJWT(
                userComplete.id,
                userComplete.username,
                userComplete.email
            );
            return res.status(200).send({
                msg: "Usuario actualizado correctamente",
                userComplete,
                token,
            });
        } else {
            res.status(404).send({
                msg: "El usuario no fue encontrado en la base de datos"
            })
        }

    } catch (error) {
        throw new Error(error);
    }
};

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userDelete = await User.findByIdAndDelete(id);
        return res.status(200).send({
            msg: "Usuario eliminado correctamente."
        });
    } catch (error) {
        throw new  Error(error);
    }
};

//Login

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.statusf(400).json({ ok: false, msg:"Este usuario no existe"});
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ ok: false, msg: "Contraseña incorrecta." });
        }
        const token = await generateJWT(user.id, user.username, user.email);
        res.send({
            ok: true,
            uId: user.id,
            name: user.username,
            email: user.email,
            token,
        });
    } catch (error) {
        throw new Error(error);
    }
};

//Registro con rol Cliente para los clientes
const registClient = async(req, res) => {
    const { email, password, rol } = req.body;
    try {
        let user = await User.findOne({ email: email});
        if (user) {
            return res.status(400).send({
                msg: "Un usuario ya esta registrado con este correo.",
                ok: false,
                user: user,
            });
        }
        user = new User(req.body);

        //Encriptación de Contraseña
        const jumps = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, jumps);

        user.rol = 'CLIENT';
 
        user = await user.save();
        
       //const token = await generateJWT(user.id, user.username, user.email);
        res.status(200).send({
            msg: "El usuario fue creado correctamente",
            user,
           // token: token,
        })
    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    createUser,
    listUsers,
    updateUser,
    deleteUser,
    loginUser,
    registClient,
}