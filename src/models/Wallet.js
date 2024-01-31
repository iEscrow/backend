const { DataTypes } = require("sequelize");
const db = require("../db/index");
const User = require("./User");

const Wallet = db.define(
  "Wallet",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    privateKey: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    publicKey: { type: DataTypes.STRING(200), allowNull: false },
    blockchain: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }
);

module.exports = Wallet;
