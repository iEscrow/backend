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
const getCripto = async (req, res, next) => {
  try {
    const { name, bank_id,estado} = req.body
   
    
    await client.connect()
    
    const queryParams = [ name, bank_id,estado]
    
    
    const query = 'Select * from "Criptocurrencies"'
    let queryResult = await client.query(query)
    
    console.log(`Criptos: ${JSON.stringify(queryResult.rows)}`)
    await client.end();
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const createCripto = async (req, res, next) => {
  try {
    const { cripto_id, name, isstablecoin, price ,estado} = req.body
    await client.connect()
    
    const queryParams = [ cripto_id, name, isstablecoin, price, estado]
    
    
    const query = 'INSERT INTO "Criptocurrencies" ("cripto_id" ,"name", "isstablecoin", "price","status") VALUES ($1, $2, $3, $4,$5)'
    await client.query(query, queryParams)

    console.log(`Note successfully inserted: ${cripto_id}`)
    
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const updateCripto = async (req, res, next) => {
  try {
    const { cripto_id, name, isstablecoin, price ,estado} = req.body
    await pool.query('UPDATE "Criptocurrencies" SET name=$2, isstablecoin=$3, price=$4, status=$5 WHERE cripto_id=$1',[cripto_id, name, isstablecoin, price ,estado]);   
    
    
    /* const queryParams = [ cripto_id, name, isstablecoin, price, estado]
    const query = 'INSERT INTO "Criptocurrencies" ("cripto_id" ,"name", "isstablecoin", "price","status") VALUES ($1, $2, $3, $4,$5)'
    await client.query(query, queryParams)

    console.log(`Note successfully inserted: ${cripto_id}`) */
    
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
  
}
const deleteCripto = async (req, res, next) => {
  
  try {
    const { cripto_id, name, isstablecoin, price ,estado} = req.body
    await pool.query('DELETE FROM "Criptocurrencies" WHERE cripto_id=$1',[cripto_id]);    
    
    
    /* const queryParams = [ cripto_id, name, isstablecoin, price, estado]
    const query = 'INSERT INTO "Criptocurrencies" ("cripto_id" ,"name", "isstablecoin", "price","status") VALUES ($1, $2, $3, $4,$5)'
    await client.query(query, queryParams)

    console.log(`Note successfully inserted: ${cripto_id}`) */
    
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

module.exports = {getCripto, createCripto, updateCripto, deleteCripto}
