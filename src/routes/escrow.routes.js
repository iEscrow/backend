const express = require("express");
const router = express.Router();

const escrowController = require("../controllers/escrow.controller");
const passportMiddleware = require("../middlewares/passportMiddleware");
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const validateToken = passportMiddleware.authenticate("jwt", {
  session: false,
});

router.get("/", jwtMiddleware, escrowController.getAllEscrows);
router.get("/types", jwtMiddleware,escrowController.getAllEscrowTypes);
router.get("/my-escrows", jwtMiddleware, escrowController.getAllMyEscrows);
router.get("/marketplace", jwtMiddleware, escrowController.getAllMarketplace);
router.get("/:id", jwtMiddleware,escrowController.getEscrowByID);
router.post("/", jwtMiddleware,escrowController.createEscrow);
router.put("/publish/:id", jwtMiddleware , escrowController.escrowPayerInfo);
router.put("/accept/:id", jwtMiddleware , escrowController.escrowPayeeAccept);
router.put("/buy/:id", jwtMiddleware , escrowController.escrowPayeeInfo);
router.put("/select-wallet/:id", jwtMiddleware , escrowController.escrowPayerWallet);
router.put("/pay/:id", jwtMiddleware , escrowController.escrowPay);

module.exports = router;
