const { DataTypes } = require("sequelize");
const db = require("../db/index");

const FooterItem = db.define("FooterItem", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
  },
  appScreen: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  webScreen: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
});

const Footer = db.define("Footer", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupedBy: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  expanded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

FooterItem.belongsTo(Footer);
Footer.hasMany(FooterItem);

module.exports = { Footer, FooterItem };
