const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller");
const auth = require("../middleware/auth.middleware");

router.post("/subscribe", auth, subscriptionController.subscribe);
router.get("/subscription-status", auth, subscriptionController.status);
router.patch("/renew", auth, subscriptionController.renew);
router.post("/cancel-subscription", auth, subscriptionController.cancel);

module.exports = router;
