const express = require('express');
const router = express.Router();

const walletController = require('../controllers/wallet.controller');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware, walletController.createETHWallet);
router.get('/',jwtMiddleware, walletController.getAll);

module.exports = router;