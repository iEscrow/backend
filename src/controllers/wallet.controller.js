const jwt = require("jsonwebtoken");
const BankAccount = require("../models/BankAccount");
const User = require("../models/User");
const { ethers } = require("ethers");
const Wallet = require("../models/Wallet");
const customProviderUrl = "https://ethereum-holesky.publicnode.com/";
const axios = require("axios");
const WebSocket = require("ws");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const checkTransaction = require("../utils/transactions.utils");

const createETHWallet = async (req, res) => {
  try {
    const customProvider = new ethers.providers.JsonRpcProvider(
      customProviderUrl
    );

    const wallet = ethers.Wallet.createRandom();
    const { address, publicKey, privateKey } = wallet.connect(customProvider);

    const { id: user_id } = req.user;


    const newWallet = await Wallet.create({
      address,
      privateKey,
      publicKey,
      user_id,
    });
    res.json(newWallet);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { id } = req.user;

    const wallets = await Wallet.findAll({ where: { user_id: id } });

    return res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBalanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findByPk(id);

    if (!wallet) {
      return res.status(404).json({ error: "Balance not found" });
    }

    await wallet.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const makeTransactionETH = async (req, res) => {
  try {
    /* 
    send: "0x6D5D5C69851BdB3e430f9Aac6482655c07A63888"
    recieve: "0x0F8eaEBED8DdCC877050Cb7922fB0A2816A6eFb5"
    */

    const provider = new ethers.providers.JsonRpcProvider(customProviderUrl);
    const privateKey =
      "0xf0fba8c7792bcc3c1fa1eba835402dffcf5abc56af0592a815a52abcf3db8094";
    const wallet = new ethers.Wallet(privateKey, provider);
    const fromAddress = "0x6D5D5C69851BdB3e430f9Aac6482655c07A63888";
    const toAddress = "0x0F8eaEBED8DdCC877050Cb7922fB0A2816A6eFb5";

    const amount = ethers.utils.parseEther("0.001");
    console.log("Cantidad en wei:", amount.toString());

    const transaction = {
      to: toAddress,
      value: amount,
    };
    console.log(toAddress);
    provider.on(toAddress, (transactionHash) => {
      console.log(`Nueva transacción entrante. Hash: ${transactionHash}`);

      // Puedes realizar acciones adicionales aquí, por ejemplo, obtener detalles de la transacción
      provider
        .getTransaction(transactionHash)
        .then((transaction) => {
          console.log("Detalles de la transacción:", transaction);
        })
        .catch((error) => {
          console.error("Error al obtener detalles de la transacción:", error);
        });
    });

    // Manejar errores en la conexión WebSocket
    provider.on("error", (error) => {
      console.error("Error en la conexión WebSocket:", error);
    });
  } catch (error) {
    console.log(error);
  }
};

//const provider = new ethers.providers.JsonRpcProvider(customProviderUrl);

/* const Web3 = require("web3");

const validateTransactions = async () => {
  const ethersWS = new Web3.JsonRpcProvider(
    "https://ethereum-holesky-rpc.publicnode.com"
  );
  const walletAddress = "0x6D5D5C69851BdB3e430f9Aac6482655c07A63888";
}; */

const subscribeToWalletEvents = async (req, res) => {
  try {
    /* const response = await axios.get("https://api-holesky.etherscan.io/api", {
      params: {
        module: "account",
        action: "txlist",
        address: "0x6D5D5C69851BdB3e430f9Aac6482655c07A63888",
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10,
        sort: "desc",
        apikey: "VTW5NHPAQ2Z2SBR9GZKUG8JM8TR8FEKPGS",
      },
    });
    const transactions = response.data.result;
    console.log(moment.unix(response.data.result[0].timeStamp).format("DD-MM-YYYY HH:mm:ss")) */

    
    const from = '0x6d5d5c69851bdb3e430f9aac6482655c07a63888'
    const to = '0x0f8eaebed8ddcc877050cb7922fb0a2816a6efb5'
    const value = "10000000000000000"
    const token = "0xCADf630c2C1a1B58EdC4509510aAeB8958331AF9"

    checkTransaction(value, from, to, 20000, new Date(), token)
  } catch (error) {
    console.error("Error al obtener transacciones:", error.message);
    res.status(500)
  }
};

module.exports = {
  createETHWallet,
  getAll,
  deleteBalanceById,
  makeTransactionETH,
  subscribeToWalletEvents
};
