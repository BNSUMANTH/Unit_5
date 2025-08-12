const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashed,
      role: role || "user",
    });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const accessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    res.json({ accessToken });
  });
};
