const Escrow = require("../models/Escrow");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Currency = require("../models/Currency");
const Wallet = require("../models/Wallet");
const BankAccount = require("../models/BankAccount");
const Bank = require("../models/Bank");
const CurrencyType = require("../models/CurrencyType");
const EscrowType = require("../models/EscrowType");
const EscrowStatus = require("../models/EscrowStatus");
const TransactionType = require("../models/TransactionType");
const determineTransactionType = require("../utils/escrow.utils");
const { Op } = require("sequelize");
const getAllEscrows = async (req, res) => {
  try {
    const escrows = await Escrow.findAll({
      include: [
        { model: EscrowStatus, as: "Status" },
        { model: EscrowType, as: "Type" },
        { model: TransactionType, as: "TransactionType" },
        { model: BankAccount, as: "PayeeBankAccountTo" },
        { model: BankAccount, as: "PayeeBankAccountFrom" },
        { model: Wallet, as: "PayeeWalletTo" },
        { model: Wallet, as: "PayeeWalletFrom" },
        { model: BankAccount, as: "PayerBankAccountTo" },
        { model: BankAccount, as: "PayerBankAccountFrom" },
        { model: Wallet, as: "PayerWalletTo" },
        { model: Wallet, as: "PayerWalletFrom" },
        { model: User, as: "PayeeUser" },
        { model: User, as: "PayerUser" },
        { model: Currency, as: "PayeeCurrency" },
        { model: Currency, as: "PayerCurrency" },
        { model: EscrowType, as: "Type" },
      ],
    });
    res.status(200).json(escrows);
  } catch (error) {
    console.error("Error al obtener escrows:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const getAllMyEscrows = async (req, res) => {
  try {
    const escrows = await Escrow.findAll({
      where: { [Op.or]: { payer_id: req.user.id, payee_id: req.user.id } },
      include: [
        { model: EscrowStatus, as: "Status" },
        { model: EscrowType, as: "Type" },
        { model: TransactionType, as: "TransactionType" },
        { model: BankAccount, as: "PayeeBankAccountTo" },
        { model: BankAccount, as: "PayeeBankAccountFrom" },
        { model: Wallet, as: "PayeeWalletTo" },
        { model: Wallet, as: "PayeeWalletFrom" },
        { model: BankAccount, as: "PayerBankAccountTo" },
        { model: BankAccount, as: "PayerBankAccountFrom" },
        { model: Wallet, as: "PayerWalletTo" },
        { model: Wallet, as: "PayerWalletFrom" },
        { model: User, as: "PayeeUser" },
        { model: User, as: "PayerUser" },
        { model: Currency, as: "PayeeCurrency" },
        { model: Currency, as: "PayerCurrency" },
        { model: EscrowType, as: "Type" },
      ],
    });
    res.status(200).json(escrows);
  } catch (error) {
    console.error("Error al obtener escrows:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getEscrowByID = async (req, res) => {
  try {
    const { id } = req.params;

    const escrow = await Escrow.findByPk(id, {
      include: [
        { model: EscrowStatus, as: "Status" },
        { model: EscrowType, as: "Type" },
        { model: TransactionType, as: "TransactionType" },
        { model: BankAccount, as: "PayeeBankAccountTo" },
        { model: BankAccount, as: "PayeeBankAccountFrom" },
        { model: Wallet, as: "PayeeWalletTo" },
        { model: Wallet, as: "PayeeWalletFrom" },
        { model: BankAccount, as: "PayerBankAccountTo" },
        { model: BankAccount, as: "PayerBankAccountFrom" },
        { model: Wallet, as: "PayerWalletTo" },
        { model: Wallet, as: "PayerWalletFrom" },
        { model: User, as: "PayeeUser" },
        { model: User, as: "PayerUser" },
        { model: Currency, as: "PayeeCurrency" },
        { model: Currency, as: "PayerCurrency" },
        { model: EscrowType, as: "Type" },
      ],
    });
    res.json(escrow);
  } catch (error) {}
};

const getAllEscrowTypes = async (req, res) => {
  try {
    const types = await EscrowType.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error("Error al obtener escrows:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createEscrow = async (req, res) => {
  try {
    const { payer_currency, payee_currency } = req.body;

    const payerCurrency = await Currency.findByPk(payer_currency, {
      include: CurrencyType,
    });
    const payeeCurrency = await Currency.findByPk(payee_currency, {
      include: CurrencyType,
    });

    const transaction_type = await TransactionType.findOne({
      where: {
        name: `${payerCurrency.CurrencyType.dataValues.name}-${payeeCurrency.CurrencyType.dataValues.name}`,
      },
    });

    const newEscrow = await Escrow.create(
      {
        payer_id: req.user.id,
        status: 1,
        transaction_type: transaction_type.id,
        payer_currency_type: payerCurrency.CurrencyType.dataValues.id,
        payee_currency_type: payeeCurrency.CurrencyType.dataValues.id,

        ...req.body,
      },
      { raw: true }
    );
    return res.json(newEscrow);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const escrowPayerInfo = async (req, res) => {
  try {
    const {
      payer_amount,
      payer_dolar_price,
      transaction_type
    } = req.body;
    const transactionType = await TransactionType.findByPk(transaction_type);
    function calculatePayeeAmount() {
      let payeeAmount = 0

      const payer_amount_usdt = payer_amount  / payer_dolar_price

      switch (transactionType.name) {
        case "FIAT-CRYPTO":
          payeeAmount = payer_amount_usdt;
          break
        case "CRYPTO-CRYPTO":
          payeeAmount = payer_amount;
          break;
        case "CRYPTO-FIAT":
          payeeAmount = payer_amount  * payer_dolar_price;
          break
        case "FIAT-FIAT":
          payeeAmount = payer_amount ;
          break;
        default:
          console.error("Tipo de transacción no reconocido");
          return null;
      }
    
      return payeeAmount;
    }
    
 

    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        status: 2,
        payee_amount: calculatePayeeAmount(),
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        raw: true,
      }
    );
    return res.status(200).json(updatedEscrow[1]);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const escrowPayeeAccept = async (req, res) => {
  try {
    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        payee_id: req.user.id,
        status: 3,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    return res.status(200).json(updatedEscrow[1]);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const escrowPayeeInfo = async (req, res) => {
  try {
    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        payee_id: req.user.id,
        status: 4,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    return res.status(200).json(updatedEscrow[1]);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const escrowPay = async (req, res) => {

  try {
    console.log("pay", req.body)

    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        status: req.body.payer_id === req.user.id ? 5 : 6,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    return res.status(200).json(updatedEscrow[1]);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
module.exports = {
  getAllEscrows,
  createEscrow,
  getAllEscrowTypes,
  getEscrowByID,
  escrowPayerInfo,
  escrowPayeeInfo,
  getAllMyEscrows,
  escrowPayeeAccept,escrowPay
};
