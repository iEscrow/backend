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

  describe('PUT /Offers', function () {
    it('Create an offer', async function () {
      const req = {
        offer_id:'Offer'+ Math.floor(Math.random()*3000),
        user_id:'USR445',
        type:'type' + Math.floor(Math.random()*1000),
        access: 'Public' + Math.floor(Math.random()*1000),
        owner: 'Propietarion' + Math.floor(Math.random()*100000),
        estado: 'status is not ok'
      }
      console.log(req)
      await putOffer(req)

      const { rows } = await client.query('SELECT * from public."Bank"')
     console.log(rows[1])
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })

    it('Delete an offer', async function () {
      const req = {
        offer_id:'Offer1639',
        user_id:'USR445',
        type:'type' + Math.floor(Math.random()*1000),
        access: 'Public' + Math.floor(Math.random()*1000),
        owner: 'Propietarion' + Math.floor(Math.random()*100000),
        estado: 'status is not ok'
      }
      console.log(req)
      await delOffer(req)
      
    })

    it('Update an offer', async function () {
      const req = {
        offer_id:'bkid1',
        user_id:'USR445',
        type:'type' + Math.floor(Math.random()*1000),
        access: 'Public' + Math.floor(Math.random()*1000),
        owner: 'Propietarion' + Math.floor(Math.random()*100000),
        estado: 'status is not ok'
      }
      console.log(req)
      await updateOffer(req)
      
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

  describe('PUT /Offer', function () {
    
    /* it('func in line 85', async function () {
      const req = {
        offer_id: 'bkid'+ Math.floor(Math.random()*3+1),
        user_id:'USR445',
        Name:'MyName' + Math.floor(Math.random()*1000),
        access: 'MyLastname' + Math.floor(Math.random()*1000),
        owner: Math.floor(Math.random()*100000),
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

    // it('Should fail if name already exists', async function () {
    //   const req = {
    //     name: 'note1',
    //     content: 'content1'
    //   }
    //   await putBank(req)
    //   await putBank(req, 400) // Second request should fail
    // })

  //   it('Should fail if request is missing required params', async function () {
  //     await putBank({ name: 'note1' }, 400)
  //     await putBank({ content: 'content1' }, 400)
  //     await putBank({}, 400)
  //   })
  // })

  async function putOffer (req, status = 200) {
  const { body } = await request(app)
    .post('/Offer')
    .send(req)
    .expect(200)
  return body
  }

  async function delOffer (req, status = 200) {
    const { body } = await request(app)
      .delete('/Offer')
      .send(req)
      .expect(200)
    return body
    }

    async function updateOffer (req, status = 200) {
      const { body } = await request(app)
        .put('/Offer')
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

