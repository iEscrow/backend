const { Sequelize } = require('sequelize')
const User = require('../models/User')
const dbConfig = require('../config/database')

const sequelize = new Sequelize(dbConfig)

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida correctamente.')

    await sequelize.sync({ alter: true })
    console.log('Sincronizado con la base de datos.')
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error)
  }
})()

module.exports = sequelize
