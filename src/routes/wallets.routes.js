const express = require('express');
const router = express.Router();

const walletController = require('../controllers/wallet.controller');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware, walletController.createETHWallet);
router.get('/startSubscription',walletController.subscribeToWalletEvents);
router.post('/transaction',jwtMiddleware, walletController.makeTransactionETH);
router.get('/',jwtMiddleware, walletController.getAll);
router.delete('/:id',jwtMiddleware, walletController.deleteBalanceById);

module.exports = router;