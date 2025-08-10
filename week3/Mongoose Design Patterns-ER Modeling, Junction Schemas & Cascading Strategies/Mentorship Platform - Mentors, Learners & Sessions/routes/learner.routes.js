const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/learner.controller");

// Create a new learner
router.post("/", createLearner);

// Get all active learners
router.get("/", getAllLearners);

// Search learners by skill level
router.get("/search", searchLearnersBySkillLevel);

// Find learners who have attended more than N sessions
router.get("/by-session-count", getLearnersBySessionCount);

// Get learners for a particular session
router.get("/session/:sessionId", getSessionLearners);

// Get learner by ID
router.get("/:id", getLearnerById);

// Update learner
router.put("/:id", updateLearner);

// Soft delete learner
router.delete("/:id", deleteLearner);

// Get all active sessions for a learner
router.get("/:id/sessions", getLearnerSessions);

// List all mentors a learner has ever interacted with
router.get("/:id/mentors", getLearnerMentors);

// Get learner statistics
router.get("/:id/stats", getLearnerStats);

module.exports = router;
