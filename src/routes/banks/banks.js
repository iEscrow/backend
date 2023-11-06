const express = require('express'); //import express


const router  = express.Router(); 

const BankController = require('../../controllers/banks'); 

router.get('/banks', BankController.getBanks);
router.post('/banks', BankController.createBanks); 
router.put('/banks', BankController.updateBanks); 
router.delete('/banks', BankController.deleteBanks); 

module.exports = router; // export to use in server.js
