const { DataTypes } = require('sequelize');
const db = require("../db/index");

const EscrowType = db.define('EscrowType', {
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

module.exports = EscrowType;
