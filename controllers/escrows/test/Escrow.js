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

  describe('PUT /Escrow', function () {
    it('Create a new Escrow', async function () {
      const req = {
        cripto_id:'Cripto nro 2475',
        escrow_id:'Escrow'+ Math.floor(Math.random()*1000),
        offer_id: 'Offer2342',
        estado: 'Pendant',
        
      }
      //console.log(req)
      await putEscrow(req)
      const { rows } = await client.query('SELECT * FROM public."Escrow"')
      console.log(rows.length)
      await delEscrow(req)
     //console.log(rows)
      //expect(rows).lengthOf(1)
      //expect(rows[0]).to.equal(req)
      
    })

    it('Delete an existent Escrow', async function () {
      const req = {
        cripto_id:'Cripto nro 2475',
        escrow_id:'Escrow240',
        offer_id: 'Offer2342',
        estado: 'Pendant',
        
      }
      //console.log(req)
      await delEscrow(req)

      const { rows } = await client.query('SELECT * FROM public."Escrow"')
      console.log(rows.length)
     
      
    })

    it('Update an existent Escrow', async function () {
      const req = {
        cripto_id:'Cripto nro 2475',
        escrow_id:'Escrow311',
        offer_id: 'Offer2342',
        estado: 'Modified',
        
      }
      //console.log(req)
      await updateEscrow(req)

      const { rows } = await client.query('SELECT * FROM public."Escrow"')
      console.log(rows.length)
     
      
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

  describe('PUT /Escrow', function () {
    
    /* it('func in line 85', async function () {
      const req = {
        Offer_id: 'bkid'+ Math.floor(Math.random()*3+1),
        Name:'USR445',
        Name:'MyName' + Math.floor(Math.random()*1000),
        Price: 'MyLastname' + Math.floor(Math.random()*1000),
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

  async function putEscrow (req, status = 200) {
  const { body } = await request(app)
    .post('/Escrow')
    .send(req)
    .expect(200)
  return body
  }

  async function delEscrow (req, status = 200) {
    const { body } = await request(app)
      .delete('/Escrow')
      .send(req)
      .expect(200)
    return body
    }

    async function updateEscrow (req, status = 200) {
      const { body } = await request(app)
        .put('/Escrow')
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

