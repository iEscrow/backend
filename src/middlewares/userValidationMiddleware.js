const userSchema = require('../schemas/userSchema')

const createUserValidator = (req, res, next) => {
  const validation = userSchema.validate(req.body, { abortEarly: false })

  if (validation.error) {
    res.json({ success: false, response: validation.error.details })
  } else {
    next()
  }
}
const updateUserValidator = (req, res, next) => {
  const updateSchema = userSchema.fork(
    ['firstname', 'lastname', 'password', 'repeat_password', 'email'],
    (field) => field.optional()
  )
  const validation = updateSchema.validate(req.body, { abortEarly: false })

  if (validation.error) {
    res.json({ success: false, response: validation.error.details })
  } else {
    next()
  }
}

module.exports = { createUserValidator, updateUserValidator }
