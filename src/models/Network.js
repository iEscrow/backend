const { DataTypes } = require('sequelize');
const db = require("../db/index");

const Network = db.define('Network', {
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

module.exports = Network;
