const { DataTypes } = require('sequelize');
const db = require("../db/index");

const Token = db.define('Tokens', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  currency_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  standard_id:{
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Token;
