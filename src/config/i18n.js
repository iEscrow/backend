const i18n = require('i18n')
const path = require('path')

i18n.configure({
  locales: ['en', 'es'], // Idiomas disponibles
  defaultLocale: 'en', // Idioma predeterminado
  directory: path.join(__dirname, '/locales'), // Directorio donde se almacenan los archivos de traducción
  objectNotation: true, // Permite la notación de objetos en los archivos de traducción
  logWarnFn: (msg) => {
    console.warn('i18n Warning:', msg)
  },
})

module.exports = i18n
