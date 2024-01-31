const { DataTypes } = require('sequelize');
const db = require("../db/index");

const Balance = db.define('Balance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Balance;
