const express = require("express");
const router = express.Router();
const {
  addPatient,
  getDoctorsByPatient,
  getPatientsByGender,
  deletePatient,
} = require("../controller/patient.controller");

router.post("/", addPatient);

router.get("/:id/doctors", getDoctorsByPatient);

router.get("/", getPatientsByGender);

router.delete("/:id", deletePatient);

module.exports = router;
