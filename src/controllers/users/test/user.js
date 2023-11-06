const { expect } = require('chai')
const request = require('supertest')
const Pool = require('pg-pool')
//const client = require('./poolClient')
const { Client } = require('pg')
const client = new Client()


describe('Users route', function () {
  let app

  before('Mock db connection and load app', async function () {
    // Create a new pool with a connection limit of 1
    const pool = new Pool({
      host: 'localhost',
      database: 'iescrow',
      user: 'postgres',
      password: 'Emiliano',
      port: 5432,
      max: 1, // Reuse the connection to make sure we always hit the same temporal schema
      idleTimeoutMillis: 0, // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
    })
    //await client.connect()
    // Mock the query function to always return a connection from the pool we just created
    client.query = (text, values) => {
      return pool.query(text, values)
    }

    // It's important to import the app after mocking the database connection
    app = require('../index')    
  })

  

  describe('PUT /users', function () {
    it('Create new user', async function () {
      const req = {
        bank_account_id:'bkid'+ Math.floor(Math.random()*3+1),

        user_id:'USR'+ Math.floor(Math.random()*1000),
        name:'Myname' + Math.floor(Math.random()*1000),
        last_name: 'MyLastname' + Math.floor(Math.random()*1000),
        id_number: Math.floor(Math.random()*100000),
        security_level:'user',
        bank_account2:'bkid'+ Math.floor(Math.random()*3+1),
        bank_account3:'bkid'+ Math.floor(Math.random()*3+1),
        bank_account4:'bkid'+ Math.floor(Math.random()*3+1)
        
      }
      console.log(req)
      await putUser(req)

      //const { rows } = await client.query('SELECT * from public."Bank"')

      
    // console.log(rows[1])
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })
    
  }
  )

  describe('DELETE /users', function () {
    it('Delete recently created user', async function () {
      const req = {
        bank_account_id:'bkid'+ Math.floor(Math.random()*3+1),

        user_id:'USR200',
        name:'Myname' + Math.floor(Math.random()*1000),
        last_name: 'MyLastname' + Math.floor(Math.random()*1000),
        id_number: Math.floor(Math.random()*100000),
        security_level:'user',
        bank_account2:'bkid'+ Math.floor(Math.random()*3+1),
        bank_account3:'bkid'+ Math.floor(Math.random()*3+1),
        bank_account4:'bkid'+ Math.floor(Math.random()*3+1)
        
      }
      console.log(req)
      await delUser(req)

      //const { rows } = await client.query('SELECT * from public."Bank"')

      
    // console.log(rows[1])
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })
    
  }
  )

  describe('UPDATE /users', function () {
    it('UPDATE a user by user_id', async function () {
      const req = {
        bank_account_id:'bkid'+ Math.floor(Math.random()*3+1),
        user_id:'USR771',
        name:'Myname' + Math.floor(Math.random()*1000),
        last_name: 'MyLastname' + Math.floor(Math.random()*1000),
        id_number: Math.floor(Math.random()*100000),
        security_level:'Administrator',
        bank_account2:'bkid'+ Math.floor(Math.random()*3+1),
        bank_account3:'bkid'+ Math.floor(Math.random()*3+1),
        bank_account4:'bkid'+ Math.floor(Math.random()*3+1)
        
      }
      console.log(req)
      await updateUser(req)

      //const { rows } = await client.query('SELECT * from public."Bank"')

      
    // console.log(rows[1])
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })
    
  }
  )

//Test de borrar todos los registros de bank
  /* describe('PUT /bank', function () {
    it('Delete all banks', async function () {
      

      const { rows } = await client.query('DELETE from public."Bank"')
     //console.log(rows[0])
     
      expect(rows).lengthOf(0)
      //expect(rows[0]).to.equal(req)
      
    })
  }
  ) */
  //Add a new user test

  async function putUser (req, status = 200) {
  const { body } = await request(app)
    .post('/user')
    .send(req)
    .expect(200)
  return body
  }


async function delUser (req, status = 200) {
  const { body } = await request(app)
    .delete('/user')
    .send(req)
    .expect(200)
  return body
  }
// hay que copiar el test de update y crear el Route
  async function updateUser (req, status = 200) {
    const { body } = await request(app)
      .put('/user')
      .send(req)
      .expect(200)
    return body
    }

})



