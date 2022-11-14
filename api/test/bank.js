const { expect } = require('chai')
const request = require('supertest')
const Pool = require('pg-pool')
//const client = require('./poolClient')
const { Client } = require('pg')
const client = new Client()


describe('Bank route', function () {
  let app

  before('Mock db connection and load app', async function () {
    // Create a new pool with a connection limit of 1
    const pool = new Pool({
      database: 'postgres',
      user: 'snielsen',
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

  describe('PUT /bank', function () {
    it('Should create a new bank', async function () {
      const req = {
        name: 'note1',
        content: 'content1'
      }
      await putBank(req)

      const { rows } = await client.query('SELECT * from "Bank"', [req.name])
      expect(rows).lengthOf(1)
      expect(rows[0]).to.deep.equal(req)
    })

    it('Should fail if name already exists', async function () {
      const req = {
        name: 'note1',
        content: 'content1'
      }
      await putBank(req)
      await putBank(req, 400) // Second request should fail
    })

    it('Should fail if request is missing required params', async function () {
      await putBank({ name: 'note1' }, 400)
      await putBank({ content: 'content1' }, 400)
      await putBank({}, 400)
    })
  })

  async function putBank (req, status = 200) {
    const { body } = await request(app)
      .post('/bank')
      .send(req)
      .expect(200)
    return body
  }
})