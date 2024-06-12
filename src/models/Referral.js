const { DataTypes } = require("sequelize");
const db = require("../db/index");

const Referral = db.define("Referrals", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  escrow_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commission: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  referring_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  referred_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

module.exports = { Referral };
