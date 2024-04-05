const express = require('express');
const router = express.Router();

const balanceController = require('../controllers/balance.controller');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware, balanceController.createBalance);
router.get('/', jwtMiddleware,balanceController.getAllBalances);
router.get('/get-balances-by-user', jwtMiddleware,balanceController.getBalanceByUserId); 
router.put('/:id', jwtMiddleware,balanceController.updateBalanceById);
router.delete('/:id', jwtMiddleware,balanceController.deleteBalanceById);

module.exports = router;