const { DataTypes } = require('sequelize');
const db = require("../db/index");

const TransactionType = db.define('TransactionType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = TransactionType;
