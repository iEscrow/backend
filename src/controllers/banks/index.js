const express = require('express');
const Pool = require('pg-pool')
const { Client } = require('pg')
const client = new Client();

var bodyParser = require('body-parser')
const router = express.Router();
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Parse request body
app.use(express.json())

const pool = new Pool({
  host: '3.22.169.23',
  database: 'iescrow',
  user: 'postgres',
  password: 'Sebast24',
  port: 5432,
  max: 1, // Reuse the connection to make sure we always hit the same temporal schema
  idleTimeoutMillis: 0, // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
})

// Mock the query function to always return a connection from the pool we just created
client.query = (text, values) => {
  return pool.query(text, values)
}

const getBanks = async (req, res, next) => {
  try {
    const { name, bank_id, estado } = req.body

    const queryParams = [name, bank_id]

    const query = 'Select * from "Bank"'
    let queryResult = await client.query(query)

    res.json({ banks: queryResult.rows })
    await client.end()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const createBanks = async (req, res, next) => {
  try {
    console.log('Body: ', req.body)
    const { Name, Bank_Id, Status } = req.body

    const queryParams = [Bank_Id, Name, Status]
    const data = { Bank_id: Bank_Id, Name: Name, Status: Status }
    const query =
      'INSERT INTO "Bank" ("Bank_Id", "Name", "Status") VALUES ($1, $2, $3)'

    const result = await client.query(query, queryParams)
    console.log('Query Result: ', result)
    console.log(`Bank successfully inserted: ${Name}`)
    await client.end()
    res.status(200)
    res.json({ status: 'Success', payload: data })
  } catch (err) {
    console.log('err: ', err.code)
    res.status(500)
    res.send({ error: err.detail, code: err.code })
    next(err)
  }
}

const deleteBanks = async (req, res, next) =>{

  try {
    const bank_id = req.body
    await pool.query('DELETE FROM public."Bank" WHERE "bank_id"=$1' , [bank_id] ); 
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const updateBanks = async (req, res, next) =>{
  try {
    const { name, bank_id,estado} = req.body
    
    await pool.query('UPDATE public."Bank" SET name = $2, status=$3 WHERE bank_id =$1',[bank_id,name,estado]);
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}


async function disconnectPg() {
  await client.end();
  return console.log('client has disconnected');
}

// Handle errors hardcoding status 400 for the sake of simplicity in our example
app.use(function (err, req, res, next) {
  if (err) {   
    console.error(err)
    res.sendstatus(400)
  }
})

module.exports = {getBanks, createBanks, deleteBanks, updateBanks}
