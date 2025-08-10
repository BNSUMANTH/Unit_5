const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/session.controller");

// Create a new session
router.post("/", createSession);

// Get all active sessions
router.get("/", getAllSessions);

// Get recent sessions (limited to 5)
router.get("/recent", getRecentSessions);

// Get upcoming sessions
router.get("/upcoming", getUpcomingSessions);

// Search sessions by topic
router.get("/search", searchSessionsByTopic);

// Get sessions by status
router.get("/status/:status", getSessionsByStatus);

// Get session by ID
router.get("/:id", getSessionById);

// Update session
router.put("/:id", updateSession);

// Archive session (soft delete)
router.delete("/:id", archiveSession);

// Enroll a learner in a session
router.post("/:id/enroll", enrollLearner);

// Mark attendance for a learner
router.post("/:id/attendance", markAttendance);

// Add feedback for a session
router.post("/:id/feedback", addFeedback);

// Get session statistics
router.get("/:id/stats", getSessionStats);

module.exports = router;
