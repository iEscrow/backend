const { DataTypes } = require('sequelize');
const db = require("../db/index");
const Escrow = require('./Escrow');

const EscrowStatus = db.define('EscrowStatus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

//EscrowStatus.belongsTo(Escrow, { foreignKey: 'status' }); 


module.exports = EscrowStatus;
