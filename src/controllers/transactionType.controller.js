// @src/controllers/transactionType.controller.js

const TransactionType = require("../models/TransactionType");


// Get all transaction types 
exports.getAll = async (req, res) => {
  try {
    const types = await TransactionType.findAll();
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting transaction types'); 
  }
};

// Get a transaction type by ID
exports.getById = async (req, res) => {
  try {
    const type = await TransactionType.findByPk(req.params.id);
    if (!type) {
      return res.status(404).send('Transaction type not found');
    }
    res.json(type);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting transaction type');
  }
};

// Create a new transaction type
exports.create = async (req, res) => {
  try {
    const type = await TransactionType.create(req.body);
    res.status(201).json(type);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating transaction type');
  }
};

// Update a transaction type
exports.update = async (req, res) => {
  try {
    const [numAffectedRows] = await TransactionType.update(req.body, {
      where: { id: req.params.id }  
    });
    if (numAffectedRows === 0) {
      return res.status(404).send('Transaction type not found');
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating transaction type');
  }
};

// Delete a transaction type
exports.delete = async (req, res) => {
  try {
    const numAffectedRows = await TransactionType.destroy({
      where: { id: req.params.id }
    });
    if (numAffectedRows === 0) {
      return res.status(404).send('Transaction type not found');
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting transaction type');
  }
};
