const cron = require('node-cron')

// Ejecutar la tarea de purga de tokens vencidos todos los días a la medianoche
cron.schedule('0 0 * * *', () => {
  // Realizar la purga de tokens vencidos en la base de datos
  purgeExpiredTokens()
})
