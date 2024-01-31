const { DataTypes } = require('sequelize');
const db = require("../db/index");

const Country = db.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Country;
