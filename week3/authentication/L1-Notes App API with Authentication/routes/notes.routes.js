const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
