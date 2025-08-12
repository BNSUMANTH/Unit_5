const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const contentRoutes = require("./routes/content.routes");

app.use("/auth", authRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/content", contentRoutes);


mongoose
  .connect("mongodb://localhost:27017/subscription_auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
