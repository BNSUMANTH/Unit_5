const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");

router.post("/", async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);
    if (!user || !movie) {
      return res.status(400).json({ error: "Invalid user or movie" });
    }
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
