// CurrencyController.js

const Currency = require('../models/Currency');
const Country = require('../models/Country');
const Network = require('../models/Network');
const CurrencyType = require('../models/CurrencyType');
const joiSchema = require('../schemas/currency.schema');
const Token = require('../models/Token');
const TokenStandard = require('../models/TokenStandard');
const {ethers} = require('ethers');
const { checkTransaction } = require('../utils/transactions.utils');

// Get all currencies
exports.getAll = async (req, res) => {
  try {
    const currencies = await Currency.findAll({include: [CurrencyType, Country, Token, TokenStandard]});

    const from = '0x0F8eaEBED8DdCC877050Cb7922fB0A2816A6eFb5'
    const to = '0x6d5d5c69851bdb3e430f9aac6482655c07a63888'
    const value = ethers.utils.parseEther("0.0001")
    const token = "0xCADf630c2C1a1B58EdC4509510aAeB8958331AF9"

    /* "10000000000000000" */

   // checkTransaction(value, from, to, 10000, new Date(), token)
    res.json(currencies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); 
  }
};

exports.getAllByType = async (req, res) => {
  try {
    const currencyTypes = await CurrencyType.findAll()
    const currencies = await Currency.findAll({ include: [CurrencyType]})

    const groupedCurrencies = currencyTypes.map((type) => {
      const currenciesWithType = currencies.filter(
        (currency) => currency.CurrencyType.id === type.id
      );
      return {
        type: type.name,
        currencies: currenciesWithType,
      };
    });
    res.json(groupedCurrencies)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); 
  }
}

// Get currency by ID
exports.getById = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) {
      return res.status(404).send('Currency not found');
    }
    res.json(currency);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create new currency
exports.create = async (req, res) => {
  try {
    // Validate input
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    if(req.body?.name){
      const existingCurrency = await Currency.findOne({
        where: { name: req.body.name },
      });
      if (existingCurrency) {
        return res.status(400).send("Currency name already exists");
      }
    }

  

    const currency = await Currency.create(req.body);
    res.status(201).json(currency);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update currency
exports.update = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) {
      return res.status(404).send('Currency not found');
    }

    // Validate input
    const {error} = joiSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await currency.update(req.body);
    res.json(currency);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Delete currency
exports.delete = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) {
      return res.status(404).send('Currency not found'); 
    }

    await currency.destroy();
    res.send('Currency deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};