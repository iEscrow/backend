const determineTransactionType = (payer, payee) => {
  return `${payer.CurrencyType.dataValues.name}-${payee.CurrencyType.dataValues.name}`;
};

module.exports = determineTransactionType;
