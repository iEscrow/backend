// userController.js

const jwt = require("jsonwebtoken");
const BankAccount = require("../models/BankAccount");
const User = require("../models/User");
const Bank = require("../models/Bank");
const { updateSchema, createSchema } = require("../schemas/bankAccount.schema");
const Currency = require("../models/Currency");

// Obtener todas las cuentas bancarias de un usuario
const getBankAccounts = async (req, res) => {
  try {
    const user_id = req.user.id;
    const accounts = await BankAccount.findAll({
      where: { user_id },
      include: [Bank],
    });

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva cuenta bancaria para un usuario
const createBankAccount = async (req, res) => {
  try {
    // Validate data
    const { error } = createSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body)
    // Check for duplicate alias
    if (req.body.alias) {
      const duplicateAlias = await BankAccount.findOne({
        where: { alias: req.body?.alias },
      });
      if (duplicateAlias) {
        return res.status(400).send("Alias already exists");
      }
    }
    // Check for duplicate CBU
    if (req.body.cbu) {
      const duplicateCBU = await BankAccount.findOne({
        where: { cbu: req.body?.cbu },
      });

      if (duplicateCBU) {
        return res.status(400).send("CBU already exists");
      }
    }

    // Create account if valid
    const { cbu, bank_id, alias,currency_id } = req.body;
    const { id: user_id } = req.user;
    const newBankAccount = await BankAccount.create(
      { cbu, alias, user_id, bank_id, currency_id },
      { raw: true }
    );

    res.json(newBankAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    // Validate data
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const account = await BankAccount.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const updatedAccount = await account.update(req.body);
    res.json(updatedAccount);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating account");
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await BankAccount.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    await account.destroy();
    res.send("Account deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting account");
  }
};

module.exports = {
  getBankAccounts,
  createBankAccount,
};
