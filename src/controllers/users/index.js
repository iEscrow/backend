const getUsers = async (req, res, next) => {
  try {
    const { name, bank_id, estado } = req.body
    console.log(req.params)
    const queryParams = [name, bank_id, estado]

    const query = 'Select * from "Users"'
    let queryResult = await client.query(query)

    res.status(200).json({ users: queryResult.rows })
    await client.end()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const createUsers = async (req, res, next) => {
  try {
    const { User_Id, Name, Last_Name, Security_Level, Status } = req.body

    const queryParams = [User_Id, Name, Last_Name, Security_Level, Status]
    const data = {
      User_Id: User_Id,
      Name: Name,
      Last_Name: Last_Name,
      Security_Level: Security_Level,
      Status: Status,
    }
    console.log('Query Params: ', req.body)

    const query =
      'INSERT INTO "Users" ( "User_Id", "Name", "Last_Name", "Security_level", "Status") VALUES ($1, $2, $3, $4, $5)'
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
}
const updateUsers = async (req, res, next) => {
  try {
    const {
      bank_account_id,
      user_id,
      name,
      last_name,
      id_number,
      security_level,
      bank_account2,
      bank_account3,
      bank_account4,
    } = req.body
    await pool.query(
      'UPDATE public."Users" SET bank_account_id=$1, name=$3, last_name=$4,id_number=$5, security_level=$6 WHERE "user_id"=$2',
      [bank_account_id, user_id, name, last_name, id_number, security_level]
    )

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}
const removeUsers = async (req, res, next) => {
  try {
    const {
      bank_account_id,
      user_id,
      name,
      last_name,
      id_number,
      security_level,
      bank_account2,
      bank_account3,
      bank_account4,
    } = req.body
    await pool.query('DELETE FROM public."Users" WHERE "user_id"=$1', [user_id])
    console.log(`Note successfully inserted: ${name}`)

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

module.exports = { getUsers, createUsers, updateUsers, removeUsers }
