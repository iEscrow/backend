require('dotenv').config()
const mainRouter = require('./src/routes')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const i18n = require('./src/config/i18n')
const passport = require('passport')
const session = require('express-session')



app.use(cors())
app.use(bodyParser.json())
app.use(i18n.init)
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', mainRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
