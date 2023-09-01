const { expect } = require('chai')
const request = require('supertest')
const Pool = require('pg-pool')
//const client = require('./poolClient')
const { Client } = require('pg')
const client = new Client()


describe('bankaccount route', function () {
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

  

  describe('PUT /bank', function () {
    it('Crear nuevo banco', async function () {
      const req = {
        name:'Banco'+ Math.floor(Math.random()*1000),
        bank_id:'bkid'+ Math.floor(Math.random()*100+4),
        estado: 'pendiente'
      }
      console.log(req)
      await putbank(req)

      //const { rows } = await client.query('SELECT * from public."Bank"')
     //console.log(rows)
     //console.log(rows.length)
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })

    it('Borrar banco', async function () {
      const req = {
        name:'Banco'+ Math.floor(Math.random()*1000),
        bank_id:'Banco141',
        estado: 'pendiente'
        
      }
      //console.log(req.bank_id)
      
      //await client.query('SELECT FROM "Bank" WHERE bank_id = req.bank_id')
      await delbank(req)
     //console.log(rows)
     //console.log(rows.length)
            
    })

    it('Update Bank', async function () {
      const req = {
        name:'Banco'+ Math.floor(Math.random()*1000),
        bank_id:'Banco160',
        estado: 'Modificado'
        
      }
      
      
      
      await updatebank(req)
    
            
    })

  }
  )

 

  async function putbank (req, status = 200) {
  const { body } = await request(app)
    .post('/bank')
    .send(req)
    .expect(200)
  return body
  }

  async function delbank (req, status = 200) {
    const { body } = await request(app)
      .delete('/delbank')
      .send(req)
      .expect(200)
    return body
    }

    async function updatebank (req, status = 200) {
      const { body } = await request(app)
        .put('/updatebank')
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

