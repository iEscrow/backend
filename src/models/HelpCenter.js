const { DataTypes } = require('sequelize');
const db = require("../db/index");

const HelpCenterItem = db.define('HelpCenterItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iconURL:{
    type: DataTypes.TEXT, 
    allowNull: true
  }
})

const HelpCenterSubItem = db.define('HelpCenterSubItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

HelpCenterItem.hasMany(HelpCenterSubItem);
HelpCenterSubItem.belongsTo(HelpCenterItem);


module.exports = {HelpCenterItem, HelpCenterSubItem};
