const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/free", auth, contentController.getFreeContent);
router.get("/premium", auth, contentController.getPremiumContent);
router.post("/", auth, role("admin"), contentController.createContent);
router.delete("/:id", auth, role("admin"), contentController.deleteContent);
router.get("/pro/discount", auth, contentController.getProDiscount);

module.exports = router;
