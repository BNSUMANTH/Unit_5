import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/", authRoutes);
app.use("/blogs", blogRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/blogdb";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
