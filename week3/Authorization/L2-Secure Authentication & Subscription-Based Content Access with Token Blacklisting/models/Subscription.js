const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["free", "premium", "pro"], required: true },
    start: { type: Date, required: true },
    expiry: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
