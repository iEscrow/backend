const { DataTypes } = require("sequelize");
const db = require("../db/index");
const CurrencyType = require("./CurrencyType");
const Network = require("./Network");
const Country = require("./Country");
const TokenStandard = require("./TokenStandard");
const Token = require("./Token");

const Currency = db.define("Currencies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  type: {
    type: DataTypes.INTEGER,
    references: {
      model: "CurrencyTypes",
      key: "id",
    },
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Countries",
      key: "id",
    },
  },
  token_standard_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "TokenStandards",
      key: "id",
    },
  },
  token_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Tokens",
      key: "id",
    },
  },
});

Currency.belongsTo(CurrencyType, { foreignKey: "type" });
Currency.belongsTo(TokenStandard, { foreignKey: "token_standard_id" });
Currency.belongsTo(Token, { foreignKey: "token_id" });
Currency.belongsTo(Country, { foreignKey: "country_id" });

module.exports = Currency;
