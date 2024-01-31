const Joi = require('joi'); 

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.number().integer().required(),
  country_id: Joi.alternatives().try(Joi.number().integer().required(), Joi.allow(null)),
  network_id: Joi.alternatives().try(Joi.number().integer().required(), Joi.allow(null)),
}).or('country_id', 'network_id');

module.exports = schema;