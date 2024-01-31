const CurrencyType = require("../models/CurrencyType");
const { createCurrencyType, updateCurrencyType } = require("../schemas/currencyTypes.schema");

// Create a new currency type
exports.createCurrencyType = async (req, res) => {
  try {
    const { error } = createCurrencyType.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const currencyType = await CurrencyType.create(req.body);
    res.status(201).json(currencyType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all currency types
exports.getCurrencyTypes = async (req, res) => {
  try {
    const currencyTypes = await CurrencyType.findAll();
    res.json(currencyTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a currency type by ID
exports.getCurrencyTypeById = async (req, res) => {
  try {
    const currencyType = await CurrencyType.findByPk(req.params.id);
    if (!currencyType) {
      return res.status(404).json({ message: "Currency type not found" });
    }
    res.json(currencyType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a currency type
exports.updateCurrencyType = async (req, res) => {
  try {
    const {error} = updateCurrencyType.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const currencyType = await CurrencyType.findByPk(req.params.id);
    if (!currencyType) {
      return res.status(404).json({ message: "Currency type not found" });
    }
    await currencyType.update(req.body);
    res.json(currencyType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a currency type
exports.deleteCurrencyType = async (req, res) => {
  try {
    const currencyType = await CurrencyType.findByPk(req.params.id);
    if (!currencyType) {
      return res.status(404).json({ message: "Currency type not found" });
    }
    await currencyType.destroy();
    res.json({ message: "Currency type deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
