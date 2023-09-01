const express = require('express'); //import express


const router  = express.Router(); 

const offersController = require('../../controllers/offers'); 

router.get('/escrows', offersController.getOffers);
router.post('/escrows', offersController.createOffers); 
router.put('/escrows', offersController.updateOffers); 
router.delete('/escrows', offersController.deleteOffers); 

module.exports = router; // export to use in server.js