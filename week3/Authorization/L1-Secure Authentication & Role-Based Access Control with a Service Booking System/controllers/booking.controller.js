const Booking = require("../models/booking.model");

exports.createBooking = async (req, res) => {
  try {
    const { serviceName, requestedDateTime } = req.body;
    const booking = new Booking({
      user: req.user.userId,
      serviceName,
      requestedDateTime,
      status: "pending",
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Booking creation failed", error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "admin") {
      bookings = await Booking.find().populate("user", "username email");
    } else {
      bookings = await Booking.find({ user: req.user.userId });
    }
    res.json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (
      booking.user.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be updated" });
    }
    const { serviceName, requestedDateTime } = req.body;
    if (serviceName) booking.serviceName = serviceName;
    if (requestedDateTime) booking.requestedDateTime = requestedDateTime;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Booking update failed", error: err.message });
  }
};

exports.cancelOrDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (req.user.role === "admin") {
      await booking.deleteOne();
      return res.json({ message: "Booking deleted by admin" });
    }
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be cancelled" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Booking cancel/delete failed", error: err.message });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "approved";
    await booking.save();
    res.json({ message: "Booking approved" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Booking approval failed", error: err.message });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "rejected";
    await booking.save();
    res.json({ message: "Booking rejected" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Booking rejection failed", error: err.message });
  }
};
