const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["free", "premium"], required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
