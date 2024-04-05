const { DataTypes } = require("sequelize");
const db = require("../db/index");
const BankAccount = require("./BankAccount");
const Wallet = require("./Wallet");
const Balance = require("./Balance");

const User = db.define(
  "User",
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
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Wallet, { foreignKey: 'user_id' });
User.hasMany(BankAccount, { foreignKey: 'user_id' });
User.hasMany(Balance, { foreignKey: 'user_id' });




module.exports = User;
