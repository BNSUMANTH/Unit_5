const Consultation = require("../model/consultation.model");
const Doctor = require("../model/doctor.model");
const Patient = require("../model/patient.model");

// POST /consultations - Add consultation (only if both doctor and patient are active)
const addConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;

    if (!doctorId || !patientId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and Patient ID are required",
      });
    }

    // Check if doctor exists and is active
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    if (!doctor.isActive) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not active",
      });
    }

    // Check if patient exists and is active
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }
    if (!patient.isActive) {
      return res.status(400).json({
        success: false,
        message: "Patient is not active",
      });
    }

    const consultation = new Consultation({
      doctorId,
      patientId,
      notes,
    });

    const savedConsultation = await consultation.save();

    // Populate doctor and patient details for response
    await savedConsultation.populate("doctorId", "name specialization");
    await savedConsultation.populate("patientId", "name age gender");

    res.status(201).json({
      success: true,
      message: "Consultation added successfully",
      data: savedConsultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding consultation",
      error: error.message,
    });
  }
};

// GET /consultations/recent - Return last 5 consultations (active only)
const getRecentConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name age gender")
      .sort({ consultedAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: "Recent consultations retrieved successfully",
      data: consultations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving recent consultations",
      error: error.message,
    });
  }
};

module.exports = {
  addConsultation,
  getRecentConsultations,
};
