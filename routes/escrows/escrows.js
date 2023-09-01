const express = require('express'); //import express


const router  = express.Router(); 

const escrowController = require('../../controllers/escrows'); 

router.get('/escrows', escrowController.getEscrows);
router.post('/escrows', escrowController.createEscrows); 
router.put('/escrows', escrowController.updateEscrows); 
router.delete('/escrows', escrowController.deleteEscrows); 

module.exports = router; // export to use in server.js