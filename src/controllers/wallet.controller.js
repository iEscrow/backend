const jwt = require("jsonwebtoken");
const BankAccount = require("../models/BankAccount");
const User = require("../models/User");
const { ethers } = require("ethers");
const { createEtherWallet } = require("./hdWalletTesting");
const Wallet = require("../models/Wallet");

const createETHWallet = async (req, res) => {
  try {
    const { address, privateKey, publicKey } = ethers.Wallet.createRandom();

    const { id: user_id } = req.user;

    const { blockchain } = req.body;

    const newWallet = await Wallet.create({
      address,
      privateKey,
      publicKey,
      blockchain,
      user_id,
    });
    res.json(newWallet)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req,res)=> {
  try {
    console.log(req.user.id)
    const { id} = req.user

    const wallets = await Wallet.findAll({where: {user_id:id}})
    console.log(wallets)
    return res.json(wallets)

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

module.exports = {
  createETHWallet,
  getAll,
};
