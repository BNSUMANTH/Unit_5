const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";

module.exports = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  const blacklisted = await BlacklistedToken.findOne({ token });
  if (blacklisted)
    return res.status(401).json({ message: "Token blacklisted" });
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
