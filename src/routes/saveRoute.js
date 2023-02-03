const saveRouterController = require('../controllers/saveRouterController')
const { validate, schemas, REQ_PARAMTERS } = require('../util/middleware/validator')

const router = require('express').Router()

router.route('/').post(
  validate(schemas.saveAPI, REQ_PARAMTERS.BODY),
  saveRouterController.saveData
)
module.exports = router
