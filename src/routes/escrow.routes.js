const express = require("express");
const router = express.Router();

const escrowController = require("../controllers/escrow.controller");
const passportMiddleware = require("../middlewares/passportMiddleware");
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const validateToken = passportMiddleware.authenticate("jwt", {
  session: false,
});

router.get("/", escrowController.getAllEscrows);
router.get("/types", escrowController.getAllEscrowTypes);
router.get("/my-escrows", jwtMiddleware, escrowController.getAllMyEscrows);
router.get("/:id", escrowController.getEscrowByID);
router.post("/", escrowController.createEscrow);
router.put("/publish/:id", jwtMiddleware , escrowController.escrowPayerInfo);

module.exports = router;
