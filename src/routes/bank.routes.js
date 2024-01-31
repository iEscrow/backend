const express = require('express')
const router = express.Router()

const bankController = require('../controllers/bank.controller')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

router.get('/', bankController.getBanks);

// Get single bank 
router.get('/:id', bankController.getBank);

// Create new bank
router.post('/', bankController.createBank); 

// Update bank
router.put('/:id', bankController.updateBank);

// Delete bank
router.delete('/:id', bankController.deleteBank);

module.exports = router
