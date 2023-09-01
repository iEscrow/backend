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
      password: '',
      port: 5432,
      max: 1, // Reuse the connection to make sure we always hit the same temporal schema
      idleTimeoutMillis: 0 // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
    })
    //await client.connect()
    // Mock the query function to always return a connection from the pool we just created
    client.query = (text, values) => {
      return pool.query(text, values)
    }

    // It's important to import the app after mocking the database connection
    app = require('../index')    
  })

  // beforeEach('Create temporary tables', async function () {
  //   await client.query('CREATE TEMPORARY TABLE Bank (LIKE Bank INCLUDING ALL)') // This will copy constraints also
  // })

  // Optionally we could insert fake data before each test, but in this case it's not needed
  // beforeEach('Insert fake data', async function () {
  //   await client.query('INSERT INTO pg_temp.note (name, content) VALUES ("a_note", "some_content")')
  // })

  // afterEach('Drop temporary tables', async function () {
  //   await client.query('DROP TABLE IF EXISTS pg_temp.Bank')
  // })

  describe('PUT /Crypto', function () {
    it('Create a new crypto', async function () {
      const req = {
        cripto_id:'Cripto nro '+ Math.floor(Math.random()*3000),
        name:'criptoRandom'+ Math.floor(Math.random()*3000),
        isstablecoin: Math.round(Math.random()),
        price: Math.floor(Math.random()*1000),
        estado: 'Pendant'
      }
      console.log(req)
      await putCripto(req)

      const { rows } = await client.query('SELECT * from public."Bank"')
     console.log(rows[1])
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })

    it('Delete an existent crypto', async function () {
      const req = {
        cripto_id:'Cripto nro 1181',
        name:'criptoRandom'+ Math.floor(Math.random()*3000),
        isstablecoin: Math.round(Math.random()),
        price: Math.floor(Math.random()*1000),
        estado: 'Pendant'
      }
      console.log(req)
      await delCripto(req)

      const { rows } = await client.query('SELECT * from public."Bank"')
     console.log(rows.length)
      
      
    })

    it('Update an existent crypto', async function () {
      const req = {
        cripto_id:'Cripto nro 2708',
        name:'criptoRandom'+ Math.floor(Math.random()*3000),
        isstablecoin: Math.round(Math.random()),
        price: Math.floor(Math.random()*1000),
        estado: 'Modified'
      }
      console.log(req)
      await updateCripto(req)

      const { rows } = await client.query('SELECT * from public."Bank"')
     console.log(rows.length)
      
      
    })



  }
  )


  describe('PUT /Crypto', function () {
    
    /* it('func in line 85', async function () {
      const req = {
        Offer_id: 'bkid'+ Math.floor(Math.random()*3+1),
        name:'USR445',
        name:'Myname' + Math.floor(Math.random()*1000),
        price: 'MyLastname' + Math.floor(Math.random()*1000),
        Owner: Math.floor(Math.random()*100000),
        Security_level:'user'
      }
      //console.log(req)
      // await putUser(req)  al parecer el error es que en cada llamado a la función crea un cliente pero no lo destruye

      //const { rows } = await client.query('SELECT * from public."Users"')
     //console.log(rows[1])
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    }) */
  }
  )

    

  async function putCripto (req, status = 200) {
  const { body } = await request(app)
    .post('/Crypto')
    .send(req)
    .expect(200)
  return body
  }

  async function delCripto (req, status = 200) {
    const { body } = await request(app)
      .delete('/Crypto')
      .send(req)
      .expect(200)
    return body
    }

    async function updateCripto (req, status = 200) {
      const { body } = await request(app)
        .put('/Crypto')
        .send(req)
        .expect(200)
      return body
      }



})

/* async function putUser (req, status = 200) {
  const { body } = await request(app)
    .post('/user')
    .send(req)
    .expect(200)
  return body
}
}) */

