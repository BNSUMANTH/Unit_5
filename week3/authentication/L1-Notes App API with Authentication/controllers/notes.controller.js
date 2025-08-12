const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, createdBy: req.user.userId });
    await note.save();
    res.status(201).json({ message: "Note created", note });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create note", error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    res.json({ notes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();
    res.json({ message: "Note updated", note });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    res.json({ message: "Note deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: err.message });
  }
};
