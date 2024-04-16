// 2. SEGUNDO PASO
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { DB_HOST, DB_DATABASE, DB_PORT } from './config.js';

import userRoutes from './Routes/Users.routes.js'
import customerRoutes from './Routes/Customers.routes.js'

// conexion de mongoDB
const conexion = 'mongodb://'+DB_HOST+':'+DB_PORT+'/'+DB_DATABASE;
mongoose.connect(conexion).then()

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// RUTAS
app.use(userRoutes)
app.use(customerRoutes)
// PARA RUTAS DIFERENTES A LAS DE LA API
app.use( (req, res)=> {
    res.status(404).json({ status: false, errors: 'Not found'})
})
// app.get('/', (req, res) => {
//     res.send("Hola mundio")
// })

export default app;