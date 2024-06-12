const { DataTypes } = require("sequelize");
const db = require("../db/index");
const BankAccount = require("./BankAccount");
const Wallet = require("./Wallet");
const Balance = require("./Balance");

const User = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    refer_code: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    referred_by: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    }
  },
  {
    timestamps: true,
  }
);

User.hasMany(Wallet, { foreignKey: "user_id" });
User.hasMany(BankAccount, { foreignKey: "user_id" });
User.hasMany(Balance, { foreignKey: "user_id" });

module.exports = User;
