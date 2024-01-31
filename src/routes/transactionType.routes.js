const express = require('express');
const router = express.Router();

const transactionTypeController = require('../controllers/transactionType.controller');

router.post('/', transactionTypeController.create);
router.get('/', transactionTypeController.getAll);
router.get('/:id', transactionTypeController.getById); 
router.put('/:id', transactionTypeController.update);
router.delete('/:id', transactionTypeController.delete);

module.exports = router;