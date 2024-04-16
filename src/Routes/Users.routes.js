import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser, login } from "../Controllers/UsersControllers.js";

const rutas = Router();

rutas.get('/api/users', getUsers)
rutas.get('/api/users/:id', getUsers)
rutas.post('/api/users', createUser)
rutas.put('/api/users/:id', updateUser)
rutas.delete('/api/users/:id', deleteUser)
// Ruta para el inicio de sesión
rutas.post('/api/login', login);

export default rutas;