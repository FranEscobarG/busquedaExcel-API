import mongoose from "mongoose";
const { Schema } = mongoose;

// Definir el esquema para el modelo de cliente
const CustomerSchema = new Schema({
    "Clave cliente": {
        type: Number,
        required: true
    },
    "Nombre Contacto": {
        type: String,
        required: true
    },
    "Correo": {
        type: String,
        required: true
    },
    "Teléfono Contacto": {
        type: String,
        required: true
    }
}, { versionKey: false });

// Crear y exportar el modelo de cliente
const CustomerModel = mongoose.model('clientes', CustomerSchema);
export default CustomerModel;
