const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Mentor name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    expertise: {
      type: [String],
      required: [true, "At least one expertise area is required"],
      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 10;
        },
        message: "Expertise must have between 1 and 10 areas",
      },
    },
    experience: {
      type: Number,
      required: [true, "Years of experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience cannot exceed 50 years"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [0, "Hourly rate cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for active sessions
mentorSchema.virtual("activeSessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "mentor",
  match: { isActive: true, isArchived: false },
});

// Index for better query performance
mentorSchema.index({ isActive: 1, expertise: 1 });
mentorSchema.index({ email: 1 });

// Pre-save middleware to update timestamps
mentorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find active mentors
mentorSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Instance method to soft delete mentor
mentorSchema.methods.softDelete = async function () {
  this.isActive = false;
  await this.save();

  // Cascade: Disable all upcoming sessions
  const Session = mongoose.model("Session");
  await Session.updateMany(
    {
      mentor: this._id,
      isActive: true,
      scheduledTime: { $gt: new Date() },
    },
    { isActive: false }
  );

  return this;
};

// Instance method to get mentor statistics
mentorSchema.methods.getStats = async function () {
  const Session = mongoose.model("Session");
  const totalSessions = await Session.countDocuments({ mentor: this._id });
  const completedSessions = await Session.countDocuments({
    mentor: this._id,
    status: "completed",
  });
  const upcomingSessions = await Session.countDocuments({
    mentor: this._id,
    status: "scheduled",
    scheduledTime: { $gt: new Date() },
  });

  return {
    totalSessions,
    completedSessions,
    upcomingSessions,
    completionRate:
      totalSessions > 0
        ? ((completedSessions / totalSessions) * 100).toFixed(2)
        : 0,
  };
};

module.exports = mongoose.model("Mentor", mentorSchema);
