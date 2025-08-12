import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
