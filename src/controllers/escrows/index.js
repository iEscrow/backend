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
    host: 'localhost',
    database: 'iescrow',
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

const getEscrows = async (req, res, next) =>{
  try {
    const { name, bank_id,estado} = req.body
   
    
    await client.connect()
    
    const queryParams = [ name, bank_id,estado]
    
    
    const query = 'Select * from "Escrows"'
    let queryResult = await client.query(query)
    
    console.log(`Escrows: ${JSON.stringify(queryResult.rows)}`)
    await client.end();
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

const createEscrows = async (req, res, next) =>{
  try {
    const { cripto_id, escrow_id, offer_id, estado } = req.body
        
    await client.connect()
    
    const queryParams = [ cripto_id, escrow_id, offer_id, estado]
    
    
    const query = 'INSERT INTO "Escrow" ("cripto_id" ,"escrow_id", "offer_id", "status") VALUES ($1, $2, $3, $4)'
    await client.query(query, queryParams)

    console.log(`Note successfully inserted: ${escrow_id}`)
    //client.end()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const updateEscrows = async (req, res, next) =>{
  try {
    const { cripto_id, escrow_id, offer_id, estado } = req.body
        
    await pool.query('UPDATE "Escrow" SET cripto_id=$1, offer_id=$3, status=$4 WHERE escrow_id=$2',[cripto_id, escrow_id, offer_id, estado]);
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const deleteEscrows = async (req, res, next) =>{
  try {
    const { cripto_id, escrow_id, offer_id, estado } = req.body
        
    await pool.query('DELETE FROM "Escrow" WHERE escrow_id=$1',[escrow_id]);
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}


app.use(function (err, req, res, next) {
  if (err) {   
    console.error(err)
    res.sendStatus(400)
  }
})


module.exports = {getEscrows, createEscrows, updateEscrows, deleteEscrows}
