const Doctor = require("../model/doctor.model");
const Consultation = require("../model/consultation.model");

// POST /doctors - Add new doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({
        success: false,
        message: "Name and specialization are required",
      });
    }

    const doctor = new Doctor({
      name,
      specialization,
    });

    const savedDoctor = await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: savedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding doctor",
      error: error.message,
    });
  }
};

// GET /doctors/:id/patients - Return list of patients consulted by this doctor
const getPatientsByDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10 } = req.query;

    const consultations = await Consultation.find({
      doctorId: id,
      isActive: true,
    })
      .populate("patientId", "name age gender")
      .select("patientId consultedAt notes")
      .sort({ consultedAt: -1 })
      .limit(parseInt(limit));

    const patients = consultations.map((consultation) => ({
      patient: consultation.patientId,
      consultedAt: consultation.consultedAt,
      notes: consultation.notes,
    }));

    res.status(200).json({
      success: true,
      message: "Patients retrieved successfully",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving patients",
      error: error.message,
    });
  }
};

// GET /doctors/:id/consultations/count - Return total number of consultations this doctor has done
const getConsultationCount = async (req, res) => {
  try {
    const { id } = req.params;

    const count = await Consultation.countDocuments({
      doctorId: id,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      message: "Consultation count retrieved successfully",
      data: { count },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving consultation count",
      error: error.message,
    });
  }
};

// DELETE /doctors/:id - Mark doctor as inactive and cascade to consultations
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if doctor exists
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Mark doctor as inactive
    await Doctor.findByIdAndUpdate(id, { isActive: false });

    // Cascade: Mark all related consultations as inactive
    await Consultation.updateMany(
      { doctorId: id, isActive: true },
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: "Doctor and related consultations deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting doctor",
      error: error.message,
    });
  }
};

module.exports = {
  addDoctor,
  getPatientsByDoctor,
  getConsultationCount,
  deleteDoctor,
};
