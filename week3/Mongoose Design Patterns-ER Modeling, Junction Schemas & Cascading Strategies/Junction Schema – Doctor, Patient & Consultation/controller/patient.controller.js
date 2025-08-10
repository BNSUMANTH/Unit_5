const Patient = require("../model/patient.model");
const Consultation = require("../model/consultation.model");

// POST /patients - Add new patient
const addPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    if (!name || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "Name, age, and gender are required",
      });
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Gender must be Male, Female, or Other",
      });
    }

    const patient = new Patient({
      name,
      age,
      gender,
    });

    const savedPatient = await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      data: savedPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding patient",
      error: error.message,
    });
  }
};

// GET /patients/:id/doctors - Return list of doctors this patient has consulted
const getDoctorsByPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const consultations = await Consultation.find({
      patientId: id,
      isActive: true,
    })
      .populate("doctorId", "name specialization")
      .select("doctorId consultedAt notes");

    const doctors = consultations.map((consultation) => ({
      doctor: consultation.doctorId,
      consultedAt: consultation.consultedAt,
      notes: consultation.notes,
    }));

    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving doctors",
      error: error.message,
    });
  }
};

// GET /patients?gender=Male - Return all active male patients
const getPatientsByGender = async (req, res) => {
  try {
    const { gender } = req.query;

    if (!gender) {
      return res.status(400).json({
        success: false,
        message: "Gender parameter is required",
      });
    }

    const patients = await Patient.find({
      gender: gender,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      message: `Active ${gender} patients retrieved successfully`,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving patients by gender",
      error: error.message,
    });
  }
};

// DELETE /patients/:id - Mark patient as inactive and cascade to consultations
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Mark patient as inactive
    await Patient.findByIdAndUpdate(id, { isActive: false });

    // Cascade: Mark all related consultations as inactive
    await Consultation.updateMany(
      { patientId: id, isActive: true },
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: "Patient and related consultations deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting patient",
      error: error.message,
    });
  }
};

module.exports = {
  addPatient,
  getDoctorsByPatient,
  getPatientsByGender,
  deletePatient,
};
