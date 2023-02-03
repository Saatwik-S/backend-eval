const companyController = require('../controllers/companyController')
const { validate, schemas, REQ_PARAMTERS } = require('../util/middleware/validator')

const router = require('express').Router()

router.route('/').get(
  validate(schemas.companyBySector, REQ_PARAMTERS.QUERY),
  companyController.getCompanyBySector
)

module.exports = router
