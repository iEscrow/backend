const { DataTypes } = require('sequelize');
const db = require("../db/index");

const MasterWallet = db.define('MasterWallets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  address: {
    type: DataTypes.STRING, // Longitud máxima de una dirección Ethereum
    allowNull: false,
    unique: true // Asegura que no haya duplicados
  },
  privateKey: {
    type: DataTypes.STRING, // Longitud máxima de una clave privada Ethereum
    allowNull: false
  }
})

module.exports = MasterWallet;
