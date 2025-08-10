const Learner = require("../models/learner.model");
const Session = require("../models/session.model");

// Create a new learner
const createLearner = async (req, res) => {
  try {
    const learner = new Learner(req.body);
    await learner.save();

    res.status(201).json({
      success: true,
      message: "Learner created successfully",
      data: learner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all active learners
const getAllLearners = async (req, res) => {
  try {
    const learners = await Learner.findActive()
      .select(
        "name email learningGoals skillLevel bio totalSessionsAttended averageRating"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: learners.length,
      data: learners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get learner by ID
const getLearnerById = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id)
      .populate("enrolledSessions", "title topic scheduledTime status")
      .populate("completedSessions", "title topic scheduledTime");

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    if (!learner.isActive) {
      return res.status(404).json({
        success: false,
        message: "Learner is not active",
      });
    }

    res.status(200).json({
      success: true,
      data: learner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update learner
const updateLearner = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    if (!learner.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot update inactive learner",
      });
    }

    Object.assign(learner, req.body);
    await learner.save();

    res.status(200).json({
      success: true,
      message: "Learner updated successfully",
      data: learner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Soft delete learner
const deleteLearner = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    await learner.softDelete();

    res.status(200).json({
      success: true,
      message: "Learner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all active sessions for a learner
const getLearnerSessions = async (req, res) => {
  try {
    const sessions = await Session.findByLearner(req.params.id);

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

// List all mentors a learner has ever interacted with
const getLearnerMentors = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    const mentors = await learner.getMentors();

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

// Get learner statistics
const getLearnerStats = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);

    if (!learner) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    const stats = await learner.getStats();

    res.status(200).json({
      success: true,
      data: {
        learner: {
          id: learner._id,
          name: learner.name,
          email: learner.email,
          skillLevel: learner.skillLevel,
          learningGoals: learner.learningGoals,
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

// Find learners who have attended more than N sessions
const getLearnersBySessionCount = async (req, res) => {
  try {
    const { minSessions = 3 } = req.query;

    const learners = await Learner.findBySessionCount(parseInt(minSessions))
      .select("name email skillLevel totalSessionsAttended averageRating")
      .sort({ totalSessionsAttended: -1 });

    res.status(200).json({
      success: true,
      count: learners.length,
      data: learners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search learners by skill level
const searchLearnersBySkillLevel = async (req, res) => {
  try {
    const { skillLevel } = req.query;

    if (!skillLevel) {
      return res.status(400).json({
        success: false,
        message: "Skill level parameter is required",
      });
    }

    const learners = await Learner.find({
      isActive: true,
      skillLevel: skillLevel,
    })
      .select("name email skillLevel learningGoals totalSessionsAttended")
      .sort({ totalSessionsAttended: -1 });

    res.status(200).json({
      success: true,
      count: learners.length,
      data: learners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get learners for a particular session
const getSessionLearners = async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId)
      .populate(
        "learners.learner",
        "name email skillLevel totalSessionsAttended"
      )
      .select("learners title topic");

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const learners = session.learners.map((enrollment) => ({
      ...enrollment.learner.toObject(),
      enrollmentDate: enrollment.enrollmentDate,
      attendanceStatus: enrollment.attendanceStatus,
      feedback: enrollment.feedback,
    }));

    res.status(200).json({
      success: true,
      data: {
        session: {
          id: session._id,
          title: session.title,
          topic: session.topic,
        },
        learners: learners,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLearner,
  getAllLearners,
  getLearnerById,
  updateLearner,
  deleteLearner,
  getLearnerSessions,
  getLearnerMentors,
  getLearnerStats,
  getLearnersBySessionCount,
  searchLearnersBySkillLevel,
  getSessionLearners,
};
