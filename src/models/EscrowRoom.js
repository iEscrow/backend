const { DataTypes } = require("sequelize");
const db = require("../db/index");

const EscrowRoom = db.define("EscrowRoom", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  escrowId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lastReadMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  unreadMessages: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});

module.exports = EscrowRoom;
