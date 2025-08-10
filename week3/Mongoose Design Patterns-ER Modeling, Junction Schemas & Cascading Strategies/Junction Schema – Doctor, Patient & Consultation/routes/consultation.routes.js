const express = require("express");
const router = express.Router();
const {
  addConsultation,
  getRecentConsultations,
} = require("../controller/consultation.controller");

router.post("/", addConsultation);

router.get("/recent", getRecentConsultations);

module.exports = router;
