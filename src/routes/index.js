const express = require("express");
const userRoutes = require("./user.routes");
const bankRoutes = require("./bank.routes");
const bankAccountRoutes = require("./bankAccount.routes");
const escrowRoutes = require("./escrow.routes");
const currencyTypesRoutes = require("./currencyTypes.routes");
const transactionTypeRoutes = require("./transactionType.routes");
const currenciesRoutes = require("./currencies.routes");
const balanceRoutes = require("./balances.routes");
const walletsRoutes = require("./wallets.routes");
const masterWalletsRoutes = require("./masterWallets.routes");
const helpCenterRoutes = require("./helpCenter.routes");
const footerRoutes = require("./footer.routes");

const router = express.Router();
router.use("/users", userRoutes);
router.use("/bank-account", bankAccountRoutes);
router.use("/wallets", walletsRoutes);
router.use("/banks", bankRoutes);
router.use("/escrows", escrowRoutes);
router.use("/currency-types", currencyTypesRoutes);
router.use("/transaction-types", transactionTypeRoutes);
router.use("/currencies", currenciesRoutes);
router.use("/balances", balanceRoutes);
router.use("/master-wallets", masterWalletsRoutes);
router.use("/help-center", helpCenterRoutes);
router.use("/footer", footerRoutes);

module.exports = router;
