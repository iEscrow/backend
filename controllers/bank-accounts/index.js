const express = require('express');
const Pool = require('pg-pool')
//const client = require('./poolClient')
const { Client } = require('pg')
const client = new Client();
const PORT = process.env.PORT || 3000;
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
    host: 'localhost',
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
  const getBankAccounts = async (req, res, next) => {
    try {
      const query = 'SELECT * from "BankAccount"'
      let queryResult = await client.query(query)
      res.json({banks:queryResult.rows})
      await client.end();
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
};
const createBankAccount = async (req, res, next)=>{
  try {
    const {Id, Bank_Id, Account_Number, CBU, User_Id } = req.body  
    const queryParams = [ Id, Bank_Id, Account_Number, CBU, User_Id]

    const data = {Id, Bank_Id:Bank_Id, Account_Number:Account_Number,CBU:CBU, User_Id:User_Id}
    console.log("Bank Client Data: ", queryParams)
    const query = 'INSERT INTO "BankAccount" ("Id", "Bank_Id", "Account_Number", "CBU","User_Id") VALUES ($1, $2, $3, $4, $5)'
    await client.query(query, queryParams)
    await client.end();
    res.status(200)
    res.json({status:"Success", payload:data})
  
    console.log(`BankAccount successfully inserted: ${Id}`)

  } catch (err) {
    console.log("err: ", err.code)
    res.status(500)
    res.send({ error: err.detail,  code:err.code})
    next(err)
  
  }
}
const deleteBankAccount = async (req, res, next) =>{
    try {
      const { bank_account_id, bank_id,account_number,code,estado } = req.body
      await pool.query('DELETE FROM public."BankAccount" WHERE "bank_account_id"=$1' , [bank_account_id] );     
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
}
const updateBankAccount = async (req, res, next) => {
  try {
    const { bank_account_id, bank_id, account_number, code, estado } = req.body
    /* if (!name || !content) {
      const error = new Error('Missing params')
      return next(error)
    } */
    //console.log('test3'+req.body)
    //await client.connect()
    await pool.query('UPDATE public."BankAccount" SET bank_id=$2, account_number=$3, code=$4, status=$5 WHERE "bank_account_id" = $1',[bank_account_id, bank_id,account_number,code,estado]);
    //await pool.query('UPDATE public."Bank" SET name = $2, status=$3 WHERE bank_id =$1',[bank_id,name,estado]);

    
    
    //const queryParams = [ bank_account_id, bank_id,account_number,code,estado]
    
    
    //const query = 'INSERT INTO "BankAccount" ("bank_account_id" ,"bank_id", "account_number", "code", "Status") VALUES ($1, $2, $3, $4, $5)'
    //await client.query(query, queryParams)

    //console.log(`Note successfully inserted: ${bank_account_id}`)
    
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

module.exports = {getBankAccounts, createBankAccount, updateBankAccount, deleteBankAccount};


