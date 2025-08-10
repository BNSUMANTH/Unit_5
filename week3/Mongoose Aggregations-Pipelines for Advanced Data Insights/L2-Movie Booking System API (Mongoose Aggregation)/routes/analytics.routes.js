const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");

// 1. /analytics/movie-bookings
router.get("/movie-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$movieId",
          totalBookings: { $sum: 1 },
          totalSeats: { $sum: "$seats" },
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $project: {
          _id: 0,
          movieId: "$_id",
          title: "$movie.title",
          totalBookings: 1,
          totalSeats: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. /analytics/user-bookings
router.get("/user-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $group: {
          _id: "$userId",
          userName: { $first: "$user.name" },
          bookings: {
            $push: {
              bookingId: "$_id",
              movieTitle: "$movie.title",
              bookingDate: "$bookingDate",
              seats: "$seats",
              status: "$status",
            },
          },
        },
      },
      { $project: { _id: 0, userId: "$_id", userName: 1, bookings: 1 } },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. /analytics/top-users
router.get("/top-users", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$userId",
          bookingCount: { $sum: 1 },
        },
      },
      { $match: { bookingCount: { $gt: 2 } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          userName: "$user.name",
          bookingCount: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. /analytics/genre-wise-bookings
router.get("/genre-wise-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $group: {
          _id: "$movie.genre",
          totalSeats: { $sum: "$seats" },
        },
      },
      { $project: { _id: 0, genre: "$_id", totalSeats: 1 } },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. /analytics/active-bookings
router.get("/active-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $match: { status: "Booked" } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $project: {
          _id: 0,
          bookingId: "$_id",
          userName: "$user.name",
          movieTitle: "$movie.title",
          seats: 1,
          bookingDate: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
