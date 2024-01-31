const express = require('express');
const router = express.Router();

const currencyTypeController = require('../controllers/currencyTypes.controller');

// Create a new currency type 
router.post('/', currencyTypeController.createCurrencyType);

// Get all currency types
router.get('/', currencyTypeController.getCurrencyTypes);

// Get currency type by ID
router.get('/:id', currencyTypeController.getCurrencyTypeById); 

// Update currency type by ID
router.put('/:id', currencyTypeController.updateCurrencyType);

// Delete currency type by ID
router.delete('/:id', currencyTypeController.deleteCurrencyType);

module.exports = router;