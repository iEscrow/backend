const express = require('express'); //import express


const router  = express.Router(); 

const BankAccountController = require('../../controllers/bank-accounts'); 

router.get('/bank-account', BankAccountController.getBankAccounts);
router.post('/bank-account', BankAccountController.createBankAccount); 
router.put('/bank-account', BankAccountController.updateBankAccount); 
router.delete('/bank-account', BankAccountController.deleteBankAccount); 

module.exports = router; // export to use in server.js