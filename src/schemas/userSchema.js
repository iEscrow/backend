const Joi = require('joi')

const userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(50).required(),
  lastname: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(100).required(),
  repeat_password: Joi.string().trim().min(6).max(100).required(),
})

module.exports = userSchema
