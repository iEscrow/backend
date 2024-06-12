const { DataTypes } = require('sequelize');
const db = require("../db/index");

const Roles = db.define('Roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING
  }
})

module.exports = Roles;
