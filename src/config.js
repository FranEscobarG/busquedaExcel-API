// 1. PRIMER PASO
import { config } from "dotenv";
config();

// Variables de entorno a exportar
export const PORT = process.env.PORT; // Puerto de la API
// DB MONGO
export const DB_HOST = process.env.DB_HOST; 
export const DB_DATABASE = process.env.DB_DATABASE; 
export const DB_PORT = process.env.DB_PORT; 