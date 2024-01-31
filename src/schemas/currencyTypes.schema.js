const Joi = require('joi');


// Create 
const createCurrencyType = Joi.object({
    name: Joi.string().required()
})

// Update
const updateCurrencyType = Joi.object({
    name: Joi.string().required() 
})

module.exports = {createCurrencyType, updateCurrencyType}