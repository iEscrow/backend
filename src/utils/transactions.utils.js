/* eslint-disable no-undef */
const axios = require("axios");
const { ethers } = require("ethers");
const moment = require("moment");
require("dotenv").config();

const checkTransaction = async (
  amount,
  addressFrom,
  addressTo,
  time,
  timestamp,
  token,
  scan,
  onComplete
) => {
  let _time = time;
  let _timestamp = timestamp;
  // Convertir amount a wei
  const _amount = ethers.utils.parseUnits(amount.toString(), "ether");

  const _addressFrom = addressFrom.toString().toLowerCase();
  const _addressTo = addressTo.toString().toLowerCase();

  console.log("Envia desde: ", _addressFrom)
  console.log("Recibe desde: ", _addressTo)

  console.log("Aceptado, checkeando en la blockchain");
  console.log("Monto a pagar en wei", _amount.toString());

  const check = async () => {
    const response = await axios.get(process.env.ETHERSCAN_URL_HOLESKY, {
      params: {
        module: "account",
        action: token ? "tokentx" : "txlist",
        address: _addressTo,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10,
        sort: "desc",
        apikey: process.env.ETHERSCAN_APIKEY,
        contractaddress: token,
      },
    });

    console.log(response.data.result)

    const filteredTransactions = response.data.result.filter((transaction) => {
      if (transaction.from !== _addressFrom || transaction.to !== _addressTo){
        return false;
      }

      const momentTimestamp = moment.unix(transaction.timeStamp).utc();
      const momentActual = moment.utc(_timestamp);

      console.log(momentTimestamp)
      console.log(momentActual)

      const isAfter = momentTimestamp.isAfter(momentActual);

      return isAfter;
    });

    console.log(filteredTransactions);

    const sumaTotal = filteredTransactions.reduce((acc, transaction) => {
      // Convertir el valor de transacción a wei si no está ya en esa unidad
      const valueWei = ethers.utils.parseUnits(
        transaction.value.toString(),
        "wei"
      );
      return acc.add(valueWei);
    }, ethers.BigNumber.from("0"));

    if (_amount.gte(sumaTotal)) {
      console.log("Suma Total:", sumaTotal.toString());
    }

    if (sumaTotal.gte(_amount)) {
      clearInterval(intervalId);
      console.log("La cantidad total alcanzó o superó el monto deseado.");
      if (onComplete) {
        onComplete();
      }
    }

    // Retornar la cantidad restante y la cantidad total
    const cantidadRestante = _amount.sub(sumaTotal);
    console.log("Cantidad Restante:", cantidadRestante.toString());
    console.log("Cantidad Total:", sumaTotal.toString());

    // Devolver las cantidades en cada iteración
    return { cantidadRestante, cantidadTotal: sumaTotal };
  };
  const intervalId = setInterval(check, _time);
};

module.exports = { checkTransaction };
