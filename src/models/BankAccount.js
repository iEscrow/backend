const { DataTypes } = require("sequelize");
const Bank = require("./Bank");
const db = require("../db/index");
const User = require("./User");

const BankAccount = db.define(
  "BankAccount",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cbu: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    alias: { type: DataTypes.STRING(50), allowNull: true },
  },
);

BankAccount.belongsTo(Bank, { foreignKey: 'bank_id' }); 
//BankAccount.belongsTo(User, { foreignKey: 'user_id' }); 

module.exports = BankAccount;
