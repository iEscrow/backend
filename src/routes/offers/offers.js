const express = require('express'); //import express


const router  = express.Router(); 

const offersController = require('../../controllers/offers'); 

router.get('/offers', offersController.getOffers);
router.post('/offers', offersController.createOffers); 
router.put('/offers', offersController.updateOffers); 
router.delete('/offers', offersController.deleteOffers); 

module.exports = router; // export to use in server.js
