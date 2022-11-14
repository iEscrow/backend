const express = require('express');
const Pool = require('pg-pool')
//const client = require('./poolClient')
const { Client } = require('pg')
const client = new Client();
const PORT = process.env.PORT || 3000;
const app = express();

// Parse request body
app.use(express.json())

const pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: '',
    port: 5432,
    max: 1, // Reuse the connection to make sure we always hit the same temporal schema
    idleTimeoutMillis: 0 // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
  })

  // Mock the query function to always return a connection from the pool we just created
  client.query = (text, values) => {
    return pool.query(text, values)
  }

  
app.post('/bank', async function (req, res, next) {
  try {
    const { name, content } = req.body
    if (!name || !content) {
      const error = new Error('Missing params')
      return next(error)
    }
    await client.connect()
    
    const queryParams = [name, content]
    const query = 'INSERT INTO "Bank" ("Bank_Id", "Name") VALUES ($1, $2)'
    await client.query(query, queryParams)

    console.log(`Note successfully inserted: ${name}`)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// Handle errors hardcoding status 400 for the sake of simplicity in our example
app.use(function (err, req, res, next) {
  if (err) {   
    console.error(err)
    res.sendStatus(400)
  }
})

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app