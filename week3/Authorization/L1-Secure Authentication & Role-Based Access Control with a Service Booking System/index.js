require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./routes/auth.routes");
const bookingRoutes = require("./routes/booking.routes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/service-booking";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
