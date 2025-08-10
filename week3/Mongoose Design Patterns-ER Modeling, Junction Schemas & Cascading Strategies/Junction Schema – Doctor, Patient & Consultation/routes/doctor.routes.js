const express = require("express");
const router = express.Router();
const {
  addDoctor,
  getPatientsByDoctor,
  getConsultationCount,
  deleteDoctor,
} = require("../controller/doctor.controller");

router.post("/", addDoctor);


router.get("/:id/patients", getPatientsByDoctor);

router.get("/:id/consultations/count", getConsultationCount);

router.delete("/:id", deleteDoctor);

module.exports = router;
