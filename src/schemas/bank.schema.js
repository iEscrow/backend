const Joi = require('joi');

// Create bank validation schema
 const createBankSchema = Joi.object({
  name: Joi.string().required()
});

// Update bank validation schema 
 const updateBankSchema = Joi.object({
  name: Joi.string() 
});

module.exports = {createBankSchema, updateBankSchema}