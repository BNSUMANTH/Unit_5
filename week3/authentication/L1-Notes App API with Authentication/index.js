const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");

app.use("/", authRoutes);
app.use("/notes", notesRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notesapp";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
