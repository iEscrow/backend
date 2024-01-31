const Joi = require("joi");

const createSchema = Joi.object({
  bank_id: Joi.number().required(),
  user_id: Joi.number().required(),
  cbu: Joi.alternatives().try(
    Joi.string().length(22).required(),
    Joi.allow(null)
  ),
  alias: Joi.alternatives().try(
    Joi.string().max(50).required(),
    Joi.allow(null)
  ),
}).or("cbu", "alias");

const updateSchema = Joi.object({
  cbu: Joi.string().length(22).required(),
  alias: Joi.string().max(50).required(),
  bank_id: Joi.number(),
  user_id: Joi.number(),
});

module.exports = {
  createSchema,
  updateSchema,
};
