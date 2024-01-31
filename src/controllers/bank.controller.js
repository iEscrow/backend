// @src/controllers/bank.controller.js

const Bank = require('../models/Bank');
const Joi = require('joi');
const { createBankSchema, updateBankSchema } = require('../schemas/bank.schema');

// Get all banks
exports.getBanks = async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.json(banks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting banks'); 
  }
};

// Get single bank
exports.getBank = async (req, res) => {
  try {
    const bank = await Bank.findByPk(req.params.id);
    if (!bank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.json(bank);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting bank');
  }
};

// Create new bank
exports.createBank = async (req, res) => {
  try {
    const {error} = createBankSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const bank = await Bank.create(req.body);
    res.json(bank);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating bank');
  }  
};

// Update bank
exports.updateBank = async (req, res) => {
  try {
    const {error} = updateBankSchema.validate(req.body); 
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const bank = await Bank.findByPk(req.params.id);
    if (!bank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    const updatedBank = await bank.update(req.body);
    res.json(updatedBank);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating bank');
  }
};

// Delete bank
exports.deleteBank = async (req, res) => {
  try {
    const bank = await Bank.findByPk(req.params.id);
    if (!bank) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    await bank.destroy();
    res.send('Bank deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting bank');
  }
};
