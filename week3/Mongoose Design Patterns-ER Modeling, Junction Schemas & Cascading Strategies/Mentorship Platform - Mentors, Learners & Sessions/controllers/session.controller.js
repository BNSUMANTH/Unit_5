const Session = require("../models/session.model");
const Mentor = require("../models/mentor.model");
const Learner = require("../models/learner.model");

// Create a new session
const createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all active sessions
const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findActive()
      .populate("mentor", "name email expertise")
      .populate("learners.learner", "name email skillLevel")
      .sort({ scheduledTime: -1 });

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

// Get session by ID
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("mentor", "name email expertise bio rating")
      .populate("learners.learner", "name email skillLevel learningGoals");

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (!session.isActive) {
      return res.status(404).json({
        success: false,
        message: "Session is not active",
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update session
const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (!session.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot update inactive session",
      });
    }

    Object.assign(session, req.body);
    await session.save();

    res.status(200).json({
      success: true,
      message: "Session updated successfully",
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Archive session (soft delete)
const archiveSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await session.archive();

    res.status(200).json({
      success: true,
      message: "Session archived successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get recent sessions (limited to 5)
const getRecentSessions = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const sessions = await Session.findRecent(parseInt(limit));

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

// Get upcoming sessions
const getUpcomingSessions = async (req, res) => {
  try {
    const sessions = await Session.findUpcoming();

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

// Enroll a learner in a session
const enrollLearner = async (req, res) => {
  try {
    const { learnerId } = req.body;

    if (!learnerId) {
      return res.status(400).json({
        success: false,
        message: "Learner ID is required",
      });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (!session.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot enroll in inactive session",
      });
    }

    await session.enrollLearner(learnerId);

    res.status(200).json({
      success: true,
      message: "Learner enrolled successfully",
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark attendance for a learner
const markAttendance = async (req, res) => {
  try {
    const { learnerId, status, notes } = req.body;

    if (!learnerId || !status) {
      return res.status(400).json({
        success: false,
        message: "Learner ID and attendance status are required",
      });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await session.markAttendance(learnerId, status, notes);

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add feedback for a session
const addFeedback = async (req, res) => {
  try {
    const { learnerId, rating, comment } = req.body;

    if (!learnerId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Learner ID and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await session.addFeedback(learnerId, rating, comment);

    res.status(200).json({
      success: true,
      message: "Feedback added successfully",
      data: session,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get session statistics
const getSessionStats = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const stats = session.getStats();

    res.status(200).json({
      success: true,
      data: {
        session: {
          id: session._id,
          title: session.title,
          topic: session.topic,
          scheduledTime: session.scheduledTime,
          status: session.status,
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

// Search sessions by topic
const searchSessionsByTopic = async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic parameter is required",
      });
    }

    const sessions = await Session.find({
      isActive: true,
      isArchived: false,
      topic: { $regex: topic, $options: "i" },
    })
      .populate("mentor", "name email expertise")
      .populate("learners.learner", "name email")
      .sort({ scheduledTime: -1 });

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

// Get sessions by status
const getSessionsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const sessions = await Session.find({
      status: status,
      isActive: true,
      isArchived: false,
    })
      .populate("mentor", "name email expertise")
      .populate("learners.learner", "name email")
      .sort({ scheduledTime: -1 });

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

module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  archiveSession,
  getRecentSessions,
  getUpcomingSessions,
  enrollLearner,
  markAttendance,
  addFeedback,
  getSessionStats,
  searchSessionsByTopic,
  getSessionsByStatus,
};
