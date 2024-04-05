const express = require("express");
const router = express.Router();

const masterWallets = require("../controllers/masterWallets.controller");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post("/", jwtMiddleware, masterWallets.createMasterWallet);
 router.get("/", jwtMiddleware, masterWallets.getAllMasterWallets);
router.get("/:id", jwtMiddleware, masterWallets.getMasterWalletById);
router.delete("/:id", jwtMiddleware, masterWallets.deleteMasterWalletById); 

module.exports = router;
