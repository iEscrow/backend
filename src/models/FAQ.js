const { DataTypes } = require('sequelize');
const db = require("../db/index");

const FAQSet = db.define('FAQSets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iconURL:{
    type: DataTypes.TEXT, 
    allowNull: true
  }
})

const FAQItem = db.define('FAQItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

FAQSet.hasMany(FAQItem);
FAQItem.belongsTo(FAQSet);


module.exports = {FAQSet, FAQItem};
