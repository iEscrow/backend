const express = require('express');
const Pool = require('pg-pool')
//const client = require('./poolClient')
const { Client } = require('pg')
const client = new Client();
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Parse request body
app.use(express.json())


const pool = new Pool({
  host: 'localhost',
  database: 'iescrow',
  user: 'postgres',
  password: 'Emiliano',
  port: 5432,
  max: 1, // Reuse the connection to make sure we always hit the same temporal schema
  idleTimeoutMillis: 0, // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
})

// Mock the query function to always return a connection from the pool we just created
client.query = (text, values) => {
  return pool.query(text, values)
}

const getOffers = async (req, res, next) => {
  try {
    const query = 'Select * from "Offers"'
    let queryResult = await client.query(query)
    res.json({ Offers: queryResult.rows })
    await client.end()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const createOffers = async (req, res, next) => {
  try {
    const {
      Offer_id,
      Type,
      Access,
      Owner,
      User_Id,
      Offer_DateTime,
      Claim_Id,
      Send,
      Receive,
    } = req.body
    console.log('Query params: ', req.body)
    const queryParams = [
      Offer_id,
      Type,
      Access,
      Owner,
      Offer_DateTime,
      Claim_Id,
      Send,
      Receive,
    ]
    const data = {
      Offer_id: Offer_id,
      Type: Type,
      Access: Access,
      Owner: Owner,
      Offer_DateTime: Offer_DateTime,
      Claim_Id: Claim_Id,
      Send: Send,
      Receive: Receive,
    }
    const query =
      'INSERT INTO "Offers" ("Offer_id" ,"Type", "Access", "Owner","Offer_DateTime","Claim_Id","Send","Receive") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    await client.query(query, queryParams)
    await client.end()
    res.status(200)
    res.json({ status: 'Success', payload: data })
  } catch (err) {
    console.log('err: ', err.code)
    res.status(500)
    res.send({ error: err.detail, code: err.code })
    next(err)
  }
  console.log(`Offer successfully Created: ${Offer_id}`)

  res.sendStatus(200)
} 
const updateOffers = async (req, res, next) => {
  try {
    const { offer_id, user_id,type, access, owner, estado } = req.body
    /* if (!name || !content) {
      const error = new Error('Missing params')
      return next(error)
    } */
    
    //await client.connect()
    
    //const queryParams = [ offer_id, user_id,type, access, owner, estado]
    
    await pool.query('UPDATE "Offers" SET user_id=$2,type=$3, access=$4, owner=$5, status=$6 WHERE offer_id=$1',[offer_id, user_id,type, access, owner, estado]);

    //const query = 'INSERT INTO "Offers" ("offer_id" ,"user_id", "type", "access", "owner", "status") VALUES ($1, $2, $3, $4, $5,$6)'
    //await client.query(query, queryParams)

    //console.log(`Note successfully inserted: ${offer_id}`)
    
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
} 
const deleteOffers = async (req, res, next) => {
  try {
    const { offer_id, user_id,type, access, owner, estado } = req.body
    /* if (!name || !content) {
      const error = new Error('Missing params')
      return next(error)
    } */
    
    //await client.connect()
    
    //const queryParams = [ offer_id, user_id,type, access, owner, estado]
    
    await pool.query('DELETE FROM "Offers" WHERE offer_id=$1',[offer_id]);

    //const query = 'INSERT INTO "Offers" ("offer_id" ,"user_id", "type", "access", "owner", "status") VALUES ($1, $2, $3, $4, $5,$6)'
    //await client.query(query, queryParams)

    console.log(`Note successfully inserted: ${offer_id}`)
    
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
} 

module.exports = {getOffers, createOffers, updateOffers, deleteOffers}
