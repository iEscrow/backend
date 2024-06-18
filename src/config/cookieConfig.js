require('dotenv').config(); // Cargar variables de entorno del archivo .env

const cookieConfig = {
  httpOnly: true,
  secure: false,  // O true si estás usando HTTPS
  maxAge: process.env.TOKEN_MAX_AGE * 1000,  // Convertir segundos a milisegundos
  sameSite: 'strict'
};

module.exports = cookieConfig;