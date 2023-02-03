const joi = require('joi')
const REQ_PARAMTERS = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
}

const schemas = {
  saveAPI: joi.object({
    urlLink: joi.string().allow('https://store-0001.s3.amazonaws.com/input.csv').required()
  })
}
/**
 *
    * @param {joi.Schema} schema
 * @param {String} parameterType

 */
const validate = (schema, parameterType) => (req, res, next) => {
  const { error } = schema.validate(req[parameterType])
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = { validate, REQ_PARAMTERS, schemas }
