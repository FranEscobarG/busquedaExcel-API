import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CREACION DE UN ESQUEMA DE MONGODB (tabla)
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, { versionKey: false })

// Método para comparar la contraseña ingresada con la contraseña almacenada en la base de datos
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Método para generar un token de autenticación
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, 'spanlimeGood', { expiresIn: '1h' });
};

const UserModel = new mongoose.model('usuarios', UserSchema)

export const getUsers = async(req, res) => {
    try {
        const {id} = req.params; // para buscar por ID
        const rows = (id === undefined) ? await UserModel.find() : await UserModel.findById(id)
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        return res.status(500).json({ status: false, data:[error] })
    }
}

export const createUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const validation = validate(username, email, password);

        if(validation == ""){
            const hashedPassword = await bcrypt.hash(password, 10); // Cifra la contraseña antes de guardarla
            
            const newUser = new UserModel({
                username: username,
                email:email,
                password: hashedPassword
            });

            return await newUser.save().then( () => {
                res.status(200).json({ status: true, message: "Usuario creado correctamente." })
            })
        }
        else{
            return res.status(400).json({ status: false, errors: validation })
        }
    } catch (error) {
        return res.status(500).json({ status: false, data: [error.message] })
    }
}

export const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const { username, email, password } = req.body;

        const validation = validate(username, email, password);

        if(validation == ""){
            const data = {
                username: username,
                email:email,
                password: password,
            }
            await UserModel.updateOne({ _id: id }, { $set: data })
            return res.status(200).json({ status: true, message: "Usuario actualizado correctamente." });
        }
        else{
            return res.status(400).json({ status: false, errors: validation })
        }
    } catch (error) {
        return res.status(500).json({ status: false, data: [error.message] })
    }
}

export const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        await UserModel.deleteOne({ _id: id })
        return res.status(200).json({ status: true, message: "Usuario eliminado correctamente." })
    } catch (error) {
        return res.status(500).json({ status: false, data: [error.message] })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe en la base de datos
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: false, message: "El usuario no existe" });
        }

        // Verificar si la contraseña coincide
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Contraseña incorrecta" });
        }

        // Si el usuario existe y la contraseña es correcta, generar token de autenticación
        const token = user.generateAuthToken();

        // Devolver el token de autenticación como respuesta
        return res.status(200).json({ status: true, token: token });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

const validate = (username, email, password) => {
    let errors = [];

    if(username === undefined || email === undefined || password === undefined){
        errors.push("No deje campos vacíos");
    }

    // Validación de la contraseña con expresiones regulares
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!passwordRegex.test(password)) {
        errors.push("La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un dígito y un carácter especial");
    }

    return errors;
}

