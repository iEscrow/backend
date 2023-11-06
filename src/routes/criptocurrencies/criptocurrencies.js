const express = require('express'); //import express


const router  = express.Router(); 

const criptoController = require('../../controllers/criptocurrencies'); 

router.get('/criptos', criptoController.getCripto);
router.post('/criptos', criptoController.createCripto); 
router.put('/criptos', criptoController.updateCripto); 
router.delete('/criptos', criptoController.deleteCripto); 

module.exports = router; // export to use in server.js