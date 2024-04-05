const Balance = require("../models/Balance");

const createBalance = async (req, res) => {
  try {
    const { amount, currency_id } = req.body;
    const {id } = req.user
    const balance = await Balance.create({ amount, currency_id, user_id: id });
    return res.status(201).json(balance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.findAll();
    return res.status(200).json(balances);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBalanceByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const balance = await Balance.findAll({where: {user_id: id}});
    if (!balance) {
      return res.status(404).json({ error: "Balance not found" });
    }
    return res.status(200).json(balance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBalanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, currency_id } = req.body;
    const balance = await Balance.findByPk(id);

    if (!balance) {
      return res.status(404).json({ error: "Balance not found" });
    }

    await balance.update({ amount, currency_id });
    return res.status(200).json(balance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBalanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const balance = await Balance.findByPk(id);

    if (!balance) {
      return res.status(404).json({ error: "Balance not found" });
    }

    await balance.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  deleteBalanceById,
  updateBalanceById,
  getBalanceByUserId,
  getAllBalances,
  createBalance,
};
