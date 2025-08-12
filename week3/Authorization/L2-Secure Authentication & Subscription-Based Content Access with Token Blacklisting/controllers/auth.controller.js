const User = require("../models/User");
const BlacklistedToken = require("../models/BlacklistedToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

function generateTokens(user) {
  const payload = {
    id: user._id,
    role: user.role,
    subscription: user.subscription.plan,
  };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return { accessToken, refreshToken };
}

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing)
      return res.status(400).json({ message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.body;
    if (!accessToken || !refreshToken)
      return res.status(400).json({ message: "Tokens required" });
    const decodedAccess = jwt.decode(accessToken);
    const decodedRefresh = jwt.decode(refreshToken);
    await BlacklistedToken.create([
      { token: accessToken, expiry: new Date(decodedAccess.exp * 1000) },
      { token: refreshToken, expiry: new Date(decodedRefresh.exp * 1000) },
    ]);
    res.json({ message: "Logged out and tokens blacklisted" });
  } catch (err) {
    res.status(500).json({ message: "Logout error", error: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token required" });
    const blacklisted = await BlacklistedToken.findOne({ token: refreshToken });
    if (blacklisted)
      return res.status(401).json({ message: "Token blacklisted" });
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });
      const tokens = generateTokens(user);
      res.json(tokens);
    });
  } catch (err) {
    res.status(500).json({ message: "Refresh error", error: err.message });
  }
};
