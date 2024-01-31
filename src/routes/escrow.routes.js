const express = require("express");
const router = express.Router();

const escrowController = require("../controllers/escrow.controller");
const passportMiddleware = require("../middlewares/passportMiddleware");
const validateToken = passportMiddleware.authenticate("jwt", {
  session: false,
});

router.get("/", escrowController.getAllEscrows);
router.get("/types", escrowController.getAllEscrowTypes);
router.get("/:id", escrowController.getEscrowByID);
router.post("/", escrowController.createEscrow);

module.exports = router;
