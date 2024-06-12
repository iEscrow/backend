const express = require("express");
const router = express.Router();

const footerController = require("../controllers/footer.controller");

router.get("/", footerController.getItems);
router.get("/:id", footerController.getByID);
router.post("/", footerController.create);
router.put("/:id", footerController.update);
router.put("/item/:id", footerController.updateFooterItem);
router.delete("/:id", footerController.delete);

module.exports = router;
