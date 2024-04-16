import mongoose from "mongoose";
import CustomerModel from "../Models/CustomerModel.js";

// Obtener todos los clientes
export const getCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        return res.status(200).json({ status: true, data: customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Obtener todos los clientes en orden normal y luego invertir el orden del array
export const getCustomersReverse = async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        const reversedCustomers = customers.reverse(); // Invertir el orden del array
        return res.status(200).json({ status: true, data: reversedCustomers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Obtener clientes por nombre de contacto
export const getCustomersByName = async (req, res) => {
    try {
        const { name } = req.query;
        const regex = new RegExp(name, 'i'); // Expresión regular para hacer la búsqueda sin importar mayúsculas o minúsculas
        const customers = await CustomerModel.find({ "Nombre Contacto": regex });
        return res.status(200).json({ status: true, data: customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Obtener clientes por teléfono de contacto
export const getCustomersByPhone = async (req, res) => {
    try {
        const { phone } = req.query;
        const regex = new RegExp(phone); // Expresión regular para hacer la búsqueda por teléfono
        const customers = await CustomerModel.find({ "Teléfono Contacto": regex });
        return res.status(200).json({ status: true, data: customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Obtener clientes por teléfono de contacto
export const getCustomersByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const regex = new RegExp(email); // Expresión regular para hacer la búsqueda
        const customers = await CustomerModel.find({ "Correo": regex });
        return res.status(200).json({ status: true, data: customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Obtener clientes por nombre, correo o teléfono de contacto
export const getCustomersByQuery = async (req, res) => {
    try {
        const { query } = req.query;
        const regex = new RegExp(query, 'i'); // Expresión regular para hacer la búsqueda sin importar mayúsculas o minúsculas
        const customers = await CustomerModel.find({
            $or: [
                { "Nombre Contacto": regex },
                { "Correo": regex },
                { "Teléfono Contacto": regex }
            ]
        });
        return res.status(200).json({ status: true, data: customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Crear un nuevo cliente
export const createCustomer = async (req, res) => {
    try {
        const newCustomer = new CustomerModel(req.body);
        await newCustomer.save();
        return res.status(200).json({ status: true, message: "Cliente creado correctamente." });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Actualizar un cliente existente
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCustomer = req.body;
        await CustomerModel.findByIdAndUpdate(id, updatedCustomer);
        return res.status(200).json({ status: true, message: "Cliente actualizado correctamente." });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Eliminar un cliente existente
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await CustomerModel.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: "Cliente eliminado correctamente." });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
