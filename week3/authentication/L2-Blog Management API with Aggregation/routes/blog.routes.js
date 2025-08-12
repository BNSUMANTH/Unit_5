import express from "express";
import Blog from "../models/blog.model.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create blog
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blog = new Blog({ title, content, tags, createdBy: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all blogs by logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user._id });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update blog
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    const { title, content, tags } = req.body;
    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (tags !== undefined) blog.tags = tags;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Aggregation: Blog stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const blogsPerUser = await Blog.aggregate([
      { $group: { _id: "$createdBy", count: { $sum: 1 } } },
    ]);
    const tagsStats = await Blog.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.json({ totalBlogs, blogsPerUser, mostCommonTags: tagsStats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
