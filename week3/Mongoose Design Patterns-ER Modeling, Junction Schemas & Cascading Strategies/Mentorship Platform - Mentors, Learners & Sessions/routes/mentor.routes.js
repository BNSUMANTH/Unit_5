const express = require('express');
const router = express.Router();
const {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
  getMentorSessions,
  countMentorLearners,
  getMentorStats,
  getMentorsWithNoActiveSessions,
  searchMentorsByExpertise
} = require('../controllers/mentor.controller');

// Create a new mentor
router.post('/', createMentor);

// Get all active mentors
router.get('/', getAllMentors);

// Search mentors by expertise
router.get('/search', searchMentorsByExpertise);

// Get mentors with no active sessions
router.get('/no-sessions', getMentorsWithNoActiveSessions);

// Get mentor by ID
router.get('/:id', getMentorById);

// Update mentor
router.put('/:id', updateMentor);

// Soft delete mentor
router.delete('/:id', deleteMentor);

// Get all active sessions for a mentor
router.get('/:id/sessions', getMentorSessions);

// Count learners who attended a mentor's sessions
router.get('/:id/learners/count', countMentorLearners);

// Get mentor statistics
router.get('/:id/stats', getMentorStats);

module.exports = router; 