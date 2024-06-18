require('dotenv').config(); // Cargar variables de entorno del archivo .env

const cookieConfig = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict'
};

module.exports = cookieConfig;