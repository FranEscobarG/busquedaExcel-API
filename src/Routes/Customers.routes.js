import { Router } from "express";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomersReverse, getCustomersByName, getCustomersByPhone, getCustomersByEmail, getCustomersByQuery } from "../Controllers/CustomersControllers.js";

const rutas = Router();

// Rutas para obtener todos los clientes y crear un nuevo cliente
rutas.get('/api/customers', getCustomers);
rutas.get('/api/customers/reverse', getCustomersReverse);
rutas.post('/api/customers', createCustomer);
// Rutas para actualizar y eliminar un cliente existente
rutas.put('/api/customers/:id', updateCustomer);
rutas.delete('/api/customers/:id', deleteCustomer);

// Ruta para buscar clientes por nombre de contacto
rutas.get('/customers/searchByName', getCustomersByName);
// Ruta para buscar clientes por teléfono de contacto
rutas.get('/customers/searchByPhone', getCustomersByPhone);
// Ruta para buscar clientes por correo
rutas.get('/customers/searchByEmail', getCustomersByEmail);

// Ruta para buscar clientes por nombre, correo o teléfono de contacto
rutas.get('/customers/searchByQuery', getCustomersByQuery);


export default rutas;
