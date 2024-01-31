const express = require('express')
const router = express.Router()

const bankController = require('../controllers/bankAccount.controller')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

router.get(
  '/',
  jwtMiddleware,
  bankController.getBankAccounts
)
router.post(
  '/',
  jwtMiddleware,
  bankController.createBankAccount
)

module.exports = router
