const Mentor = require("../models/mentor.model");
const Session = require("../models/session.model");

// Create a new mentor
const createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();

    res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      data: mentor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all active mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findActive()
      .select(
        "name email expertise experience bio hourlyRate rating totalSessions"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get mentor by ID
const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate(
      "activeSessions",
      "title topic scheduledTime status"
    );

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    if (!mentor.isActive) {
      return res.status(404).json({
        success: false,
        message: "Mentor is not active",
      });
    }

    res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update mentor
const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    if (!mentor.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot update inactive mentor",
      });
    }

    Object.assign(mentor, req.body);
    await mentor.save();

    res.status(200).json({
      success: true,
      message: "Mentor updated successfully",
      data: mentor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Soft delete mentor
const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    await mentor.softDelete();

    res.status(200).json({
      success: true,
      message: "Mentor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all active sessions for a mentor
const getMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.findByMentor(req.params.id);

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Count learners who attended a mentor's sessions
const countMentorLearners = async (req, res) => {
  try {
    const count = await Session.countDocuments({
      mentor: req.params.id,
      "learners.attendanceStatus": "attended",
      isActive: true,
      isArchived: false,
    });

    res.status(200).json({
      success: true,
      data: {
        mentorId: req.params.id,
        totalLearnersAttended: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get mentor statistics
const getMentorStats = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    const stats = await mentor.getStats();

    res.status(200).json({
      success: true,
      data: {
        mentor: {
          id: mentor._id,
          name: mentor.name,
          email: mentor.email,
          expertise: mentor.expertise,
          rating: mentor.rating,
        },
        statistics: stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Find mentors with no active sessions
const getMentorsWithNoActiveSessions = async (req, res) => {
  try {
    const mentors = await Session.findMentorsWithNoActiveSessions();

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search mentors by expertise
const searchMentorsByExpertise = async (req, res) => {
  try {
    const { expertise } = req.query;

    if (!expertise) {
      return res.status(400).json({
        success: false,
        message: "Expertise parameter is required",
      });
    }

    const mentors = await Mentor.find({
      isActive: true,
      expertise: { $regex: expertise, $options: "i" },
    })
      .select("name email expertise experience bio hourlyRate rating")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
  getMentorSessions,
  countMentorLearners,
  getMentorStats,
  getMentorsWithNoActiveSessions,
  searchMentorsByExpertise,
};
