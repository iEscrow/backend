const { DataTypes } = require("sequelize");
const db = require("../db/index");
const EscrowStatus = require("./EscrowStatus");
const EscrowType = require("./EscrowType");
const TransactionType = require("./TransactionType");
const BankAccount = require("./BankAccount");
const Wallet = require("./Wallet");
const User = require("./User");
const Currency = require("./Currency");

const Escrow = db.define("Escrow", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.INTEGER,
    references: {
      model: "EscrowTypes",
      key: "id",
    },
  },
  payer_currency_type: {
    type: DataTypes.INTEGER,
    references: {
      model: "CurrencyTypes",
      key: "id",
    },
  },
  payer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  payer_wallet_from_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Wallets",
      key: "id",
    },
  },
  payer_wallet_to_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Wallets",
      key: "id",
    },
  },
  payer_bank_account_from_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "BankAccounts",
      key: "id",
    },
  },
  payer_bank_account_to_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "BankAccounts",
      key: "id",
    },
  },
  payer_currency: {
    type: DataTypes.INTEGER,
    references:{
      model: "Currencies",
      key:"id"
    }
  },
  payer_amount: {
    type: DataTypes.FLOAT,
  },
  payer_dolar_price: {
    type: DataTypes.FLOAT,
  },
  payee_currency_type: {
    type: DataTypes.INTEGER,
    references: {
      model: "CurrencyTypes",
      key: "id",
    },
  },
  payee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  payee_wallet_from_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Wallets",
      key: "id",
    },
  },
  payee_wallet_to_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Wallets",
      key: "id",
    },
  },
  payee_bank_account_from_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "BankAccounts",
      key: "id",
    },
  },
  payee_bank_account_to_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "BankAccounts",
      key: "id",
    },
  },
  payee_amount: {
    type: DataTypes.FLOAT,
  },
  payee_dolar_price: {
    type: DataTypes.FLOAT,
  },
  payee_currency: {
    type: DataTypes.INTEGER,
    references:{
      model: "Currencies",
      key:"id"
    }
  },
  status: {
    type: DataTypes.INTEGER,
    references: {
      model: "EscrowStatuses",
      key: "id",
    },
  },
});

Escrow.belongsTo(EscrowStatus, { foreignKey: 'status', as: 'Status' });
Escrow.belongsTo(EscrowType, { foreignKey: 'type', as: 'Type' });
Escrow.belongsTo(TransactionType, { foreignKey: 'transaction_type', as: 'TransactionType' });
Escrow.belongsTo(BankAccount, { foreignKey: 'payee_bank_account_to_id', as: 'PayeeBankAccountTo' });
Escrow.belongsTo(BankAccount, { foreignKey: 'payee_bank_account_from_id', as: 'PayeeBankAccountFrom' });
Escrow.belongsTo(Wallet, { foreignKey: 'payee_wallet_to_id', as: 'PayeeWalletTo' });
Escrow.belongsTo(Wallet, { foreignKey: 'payee_wallet_from_id', as: 'PayeeWalletFrom' });
Escrow.belongsTo(BankAccount, { foreignKey: 'payer_bank_account_to_id', as: 'PayerBankAccountTo' });
Escrow.belongsTo(BankAccount, { foreignKey: 'payer_bank_account_from_id', as: 'PayerBankAccountFrom' });
Escrow.belongsTo(Wallet, { foreignKey: 'payer_wallet_to_id', as: 'PayerWalletTo' });
Escrow.belongsTo(Wallet, { foreignKey: 'payer_wallet_from_id', as: 'PayerWalletFrom' });
Escrow.belongsTo(User, { foreignKey: 'payee_id', as: 'PayeeUser' }); 
Escrow.belongsTo(User, { foreignKey: 'payer_id', as: 'PayerUser' });
Escrow.belongsTo(Currency, { foreignKey: 'payee_currency', as: 'PayeeCurrency' });
Escrow.belongsTo(Currency, { foreignKey: 'payer_currency', as: 'PayerCurrency' });





module.exports = Escrow;
