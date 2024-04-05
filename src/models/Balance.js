const { DataTypes } = require('sequelize');
const db = require("../db/index");

const Balance = db.define('Balance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency_id:{
    type: DataTypes.INTEGER,
    references: {
      model: "Currencies",
      key: "id",
    },
  }
})

module.exports = Balance;


