const Escrow = require("../models/Escrow");
const User = require("../models/User");
const Currency = require("../models/Currency");
const Wallet = require("../models/Wallet");
const BankAccount = require("../models/BankAccount");
const CurrencyType = require("../models/CurrencyType");
const MasterWallet = require("../models/MasterWallet");
const EscrowType = require("../models/EscrowType");
const EscrowStatus = require("../models/EscrowStatus");
const TransactionType = require("../models/TransactionType");
const { Op } = require("sequelize");
const { checkTransaction } = require("../utils/transactions.utils");
const Token = require("../models/Token");
const TokenStandard = require("../models/TokenStandard");

const getAllEscrows = async (req, res) => {
  try {
    console.log("first");
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

const getAllMarketplace = async (req, res) => {
  try {
    console.log("market")
    const escrows = await Escrow.findAll({
      where: { status: 2, type: 1 },
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
  } catch (error) {
    console.error("Error al obtener escrows:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
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
    const { payer_currency, payee_currency, type } = req.body;
    const user_id = req.user.id
    const payerCurrency = await Currency.findByPk(payer_currency.id, {
      include: CurrencyType,
    });
    console.log(payerCurrency);
    const payeeCurrency = await Currency.findByPk(payee_currency.id, {
      include: CurrencyType,
    });
    console.log(payerCurrency);

    const transaction_type = await TransactionType.findOne({
      where: {
        name: `${payerCurrency.CurrencyType.dataValues.name}-${payeeCurrency.CurrencyType.dataValues.name}`,
      },
    });

    const whoPay =
      payerCurrency.CurrencyType.dataValues.name === "FIAT"
        ? null
        : req.user.id;

    const newEscrow = await Escrow.create(
      {
        payer_id: user_id,
        status: 1,
        transaction_type: transaction_type.id,
        payer_currency_type: payerCurrency.CurrencyType.dataValues.id,
        payee_currency_type: payeeCurrency.CurrencyType.dataValues.id,
        who_pay: whoPay,
        payer_currency: payer_currency.id,
        payee_currency:payee_currency.id,
        type,
      },
      { raw: true }
    );
    return res.json(newEscrow);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

const escrowPayerInfo = async (req, res) => {
  try {
    const {
      payer_amount,
      payee_amount,
      PayerCurrency,
      PayeeCurrency,
      transaction_type,
      payer_commission,
    } = req.body;
    const transactionType = await TransactionType.findByPk(transaction_type);
    let payerComision = 0;
    const getBTCValue = async () => {
      const url = "https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
      const response = await fetch(url);
      const data = await response.json();
      return parseFloat(data.price);
    };
    const getETHValue = async () => {
      const url = "https://www.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
      const response = await fetch(url);
      const data = await response.json();
      return parseFloat(data.price);
    };

    const pasarADolares = async (valor, currencyName) => {
      let realValor = 0;
      switch (currencyName) {
        case "USDT":
          realValor = valor * 1;
          break;
        case "BTC":
          realValor = valor * (await getBTCValue());
          break;
        case "ETH":
          realValor = valor * (await getETHValue());
          break;
        default:
          realValor = valor * 1;
      }

      return realValor;
    };

    const calcularComision = async (valor, currencyName) => {
      const umbral = 5000;
      console.log("valor", valor);
      const valorEnDolares = await pasarADolares(valor, currencyName);
      console.log("valorEnDolares", valorEnDolares);
      let porcentajeComision = valorEnDolares >= umbral ? 0.0035 : 0.004;
      console.log("calcula comision", valorEnDolares);
      console.log("porcentaje comision", porcentajeComision);
      const full = valor * porcentajeComision;
      const half = (valor * porcentajeComision) / 2;
      payerComision = (valor * payer_commission) / 100;
      const comisiones = {
        full,
        half,
        payerComision,
      };

      return comisiones;
    };

    console.log(await payerComision);

    const calculatePayeeAmount = async () => {
      let payer_amount_receives = 0;
      let payee_amount_receives = 0;
      let payer_amount_sent = 0;
      let payee_amount_sent = 0;
      let comisionPayer = 0;
      let comisionPayee = 0;
      let comision = 0;
      let comisionesCalculadas = await calcularComision(
        payee_amount,
        PayeeCurrency.name
      );
      let payeeComision = 0;

      console.log("transactionType", transactionType);
      switch (transactionType.name) {
        case "FIAT-CRYPTO":
          comision = comisionesCalculadas.half;
          payer_amount_sent = payer_amount;
          payer_amount_receives =
            payee_amount - comision + comisionesCalculadas.payerComision;
          payee_amount_sent =
            payee_amount + comision + comisionesCalculadas.payerComision;
          payee_amount_receives = payer_amount;

          break;
        case "CRYPTO-CRYPTO":
          comisionPayer = comisionesCalculadas.half;
          comisionPayee = comisionesCalculadas.half;
          console.log(comisionPayer, comisionPayee);
          payer_amount_sent = payer_amount + comisionPayer;
          payer_amount_receives =
            payee_amount + comisionesCalculadas.payerComision;
          payee_amount_sent =
            payee_amount + comisionPayee + comisionesCalculadas.payerComision;
          payee_amount_receives = payer_amount;
          break;
        case "CRYPTO-FIAT":
          comision = await calcularComision(payer_amount, PayerCurrency.name);

          payeeComision = await calcularComision(
            payee_amount,
            PayeeCurrency.name
          );
          console.log("comision", comision);
          payer_amount_sent = payer_amount + comision.half;
          payer_amount_receives = payee_amount + payeeComision.payerComision;
          payee_amount_sent = payee_amount + payeeComision.payerComision;
          payee_amount_receives = payer_amount - comision.half;
          break;
        default:
          console.error("Tipo de transacción no reconocido");
          return null;
      }

      console.log(req.body);

      console.log(`Payer envia ${payer_amount_sent} ${PayerCurrency.name}`);
      console.log(
        `Payer recibe ${payer_amount_receives} ${PayeeCurrency.name}`
      );
      console.log(`Payee envia ${payee_amount_sent} ${PayeeCurrency.name}`);
      console.log(
        `Payee recibe ${payee_amount_receives} ${PayerCurrency.name}`
      );
      return {
        payer_amount_sent,
        payer_amount_receives,
        payee_amount_sent,
        payee_amount_receives,
      };
    };
    const {
      payer_amount_sent,
      payer_amount_receives,
      payee_amount_sent,
      payee_amount_receives,
    } = await calculatePayeeAmount();

    const getRandomMasterWallet = async () => {
      const masterWallets = await MasterWallet.findAll();
      const randomIndex = Math.floor(Math.random() * masterWallets.length);
      return masterWallets[randomIndex];
    };

    const masterWallet = await getRandomMasterWallet();

    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        status: 2,
        payer_amount_sent: payer_amount_sent.toFixed(18),
        payer_amount_receives: payer_amount_receives.toFixed(18),
        payee_amount_sent: payee_amount_sent.toFixed(18),
        payee_amount_receives: payee_amount_receives.toFixed(18),
        master_wallet: masterWallet.address,
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
    console.log("escrow confirmado");
    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        payee_id: req.user.id,
        who_pay: req.body.who_pay === null ? req.user.id : req.body.who_pay,
        status: 3,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    console.log("updatedEscrow[1]", updatedEscrow[1]);
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
        who_pay: req.body.who_pay === null ? req.user.id : req.body.who_pay,
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

/* 
    const payer_wallet = await Wallet.findByPk(req.body.payer_wallet_from_id);
    console.log(req.body)

    const getRandomMasterWallet = async () => {
      const masterWallets = await MasterWallet.findAll();
      const randomIndex = Math.floor(Math.random() * array.length);
      return masterWallets[randomIndex];
    };

    const masterWallet = getRandomMasterWallet;

    const payer_currency = await Currency.findByPk(req.body.payer_currency, {
      include: [Token, TokenStandard],
    });
    

    checkTransaction(
      req.body.payer_amount_sent,
      payer_wallet.address,
      masterWallet.address,
      60000,
      new Date(),
      payer_currency.Token.token,
      payer_currency.TokenStandard.name
    ); */

const escrowWalletUpdate = async (req, res) => {
  const quienPaga = req.body.payer_wallet_from_id ? "payer" : "payee";
  try {
    const updatedEscrow = await Escrow.update(
      {
        [`${quienPaga}_wallet_from_id`]:
          req.body[`${quienPaga}_wallet_from_id`],
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    console.log(updatedEscrow);
    let escrow = updatedEscrow[1][0].dataValues;
    console.log(updatedEscrow[1][0]);
    transactionChecker(escrow);

    return res.status(200).json(escrow);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const transactionChecker = async (escrow) => {
  console.log(escrow);
  const payer_wallet = await Wallet.findByPk(escrow.payer_wallet_from_id);
  console.log(escrow.payer_wallet_from_id);
  console.log(payer_wallet);
  const payee_wallet = await Wallet.findByPk(escrow.payee_wallet_from_id);
  console.log(escrow.who_pay);
  console.log(escrow.payer_id);
  const whoPay = escrow.payer_id === escrow.who_pay ? "payer" : "payee";
  const timestamp = new Date();
  const payer_currency = await Currency.findByPk(escrow.payer_currency, {
    include: [Token, TokenStandard],
  });
  const payee_currency = await Currency.findByPk(escrow.payee_currency, {
    include: [Token, TokenStandard],
  });
  console.log(escrow.payer_amount_sent);
  const payerTurn = () =>
    escrow.payer_currency_type === 1
      ? null
      : checkTransaction(
          escrow.payer_amount_sent,
          payer_wallet.address,
          payee_wallet.address,
          60000,
          timestamp,
          payer_currency.Token.token,
          payer_currency.TokenStandard.name,
          async () => await escrowCryptoPay(escrow, "payer")
        );
  const payeeTurn = () =>
    escrow.payee_currency_type === 1
      ? null
      : checkTransaction(
          escrow.payee_amount_sent,
          payee_wallet.address,
          payer_wallet.address,
          60000,
          timestamp,
          payee_currency.Token.token,
          payee_currency.TokenStandard.name,
          async () => await escrowCryptoPay(escrow, "payee")
        );

  console.log(whoPay);
  if (whoPay === "payer") {
    payerTurn();
  } else {
    payeeTurn();
  }
};

const escrowCryptoPay = async (escrow, lastPay) => {
  try {
    console.log("actualizando escrow");
    escrow[`${lastPay}_paid`] = true;
    const pagaronAmbos = escrow.payer_paid && escrow.payee_paid;
    const pagoUno = escrow.payer_paid || escrow.payee_paid;

    const updated = await Escrow.update(
      {
        who_pay:
          escrow.who_pay === escrow.payer_id
            ? escrow.payee_id
            : escrow.payer_id,
        status: pagaronAmbos ? 6 : pagoUno ? 5 : 4,
        [`${lastPay}_paid`]: true,
      },
      {
        where: {
          id: escrow.id,
        },
        returning: true,
      }
    );
    let updatedEscrow = updated[1][0].dataValues;

    updatedEscrow.status !== 6 && transactionChecker(updatedEscrow);
  } catch (error) {
    console.log(error);
  }
};

const escrowPay = async (req, res) => {
  try {
    console.log("pay", req.body);
    if (req.user.id !== req.body.who_pay)
      return res.status(500).json("No es tu turno de pagar");
    const whoPay = req.body.payer_id === req.body.who_pay ? "payer" : "payee";
    const currencyType = req.body[`${whoPay}_currency_type`];
    if (currencyType !== 1)
      return res.status(500).json("Debe ser FIAT para pagar manualmente");

    const updatedEscrow = await Escrow.update(
      {
        ...req.body,
        who_pay:
          req.body.status === 5
            ? req.body.who_pay === req.user.id
              ? req.user.id === req.body.payer_id
                ? req.body.payee_id
                : req.body.payee_id
              : req.body.payee_id
            : null,
        status:
          req.body.status === 5 ? 6 : req.body.who_pay === req.user.id ? 5 : 6,
        [`${whoPay}_paid`]: true,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    let escrow = updatedEscrow[1][0].dataValues;

    escrow.status !== 6 ? transactionChecker(escrow) : null;
    return res.status(200).json(updatedEscrow[1]);
  } catch (error) {
    console.error("Error al crear escrow:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
module.exports = {
  getAllEscrows,
  createEscrow,
  getAllEscrowTypes,
  getEscrowByID,
  escrowPayerInfo,
  escrowPayeeInfo,
  getAllMyEscrows,
  getAllMarketplace,
  escrowPayeeAccept,
  escrowPayerWallet: escrowWalletUpdate,
  escrowPay,
};
