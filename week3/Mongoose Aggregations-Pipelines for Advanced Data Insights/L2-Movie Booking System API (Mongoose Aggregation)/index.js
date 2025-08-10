const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/moviebooking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/movies", require("./routes/movie.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/bookings", require("./routes/booking.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log("Server running on port 3000"));
