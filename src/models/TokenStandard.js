const { DataTypes } = require('sequelize');
const db = require("../db/index");

const TokenStandard = db.define('TokenStandards', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scanner: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = TokenStandard;
