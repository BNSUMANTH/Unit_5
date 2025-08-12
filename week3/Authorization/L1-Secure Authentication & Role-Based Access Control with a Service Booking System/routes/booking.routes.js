const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const bookingController = require("../controllers/booking.controller");

// User routes
router.post(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  bookingController.createBooking
);
router.get(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  bookingController.getBookings
);
router.put(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  bookingController.updateBooking
);
router.delete(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  bookingController.cancelOrDeleteBooking
);

// Admin actions
router.patch(
  "/:id/approve",
  authenticate,
  authorize(["admin"]),
  bookingController.approveBooking
);
router.patch(
  "/:id/reject",
  authenticate,
  authorize(["admin"]),
  bookingController.rejectBooking
);

module.exports = router;
