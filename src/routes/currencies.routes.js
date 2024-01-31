const express = require('express');
const router = express.Router();

const currenciesController = require('../controllers/currency.controller');

// Create a new currency type 
router.post('/', currenciesController.create);

// Get all currency types
router.get('/', currenciesController.getAll);
router.get('/grouped', currenciesController.getAllByType);

// Get currency type by ID
router.get('/:id', currenciesController.getById); 

// Update currency type by ID
router.put('/:id', currenciesController.update);

// Delete currency type by ID
router.delete('/:id', currenciesController.delete);

module.exports = router;