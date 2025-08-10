const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Learner name is required"],
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
    learningGoals: {
      type: [String],
      required: [true, "At least one learning goal is required"],
      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 5;
        },
        message: "Learning goals must have between 1 and 5 goals",
      },
    },
    skillLevel: {
      type: String,
      required: [true, "Skill level is required"],
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "beginner",
    },
    bio: {
      type: String,
      maxlength: [300, "Bio cannot exceed 300 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    totalSessionsAttended: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
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

// Virtual for enrolled sessions
learnerSchema.virtual("enrolledSessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "learners.learner",
  match: { isActive: true, isArchived: false },
});

// Virtual for completed sessions
learnerSchema.virtual("completedSessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "learners.learner",
  match: { status: "completed", isArchived: false },
});

// Index for better query performance
learnerSchema.index({ isActive: 1, skillLevel: 1 });
learnerSchema.index({ email: 1 });

// Pre-save middleware to update timestamps
learnerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find active learners
learnerSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Static method to find learners with more than N sessions
learnerSchema.statics.findBySessionCount = function (minSessions) {
  return this.find({
    isActive: true,
    totalSessionsAttended: { $gte: minSessions },
  });
};

// Instance method to soft delete learner
learnerSchema.methods.softDelete = async function () {
  this.isActive = false;
  await this.save();

  // Cascade: Remove from all upcoming sessions or mark attendance as cancelled
  const Session = mongoose.model("Session");
  await Session.updateMany(
    {
      "learners.learner": this._id,
      isActive: true,
      scheduledTime: { $gt: new Date() },
    },
    {
      $set: {
        "learners.$.attendanceStatus": "cancelled",
        "learners.$.cancelledAt": new Date(),
      },
    }
  );

  return this;
};

// Instance method to get learner statistics
learnerSchema.methods.getStats = async function () {
  const Session = mongoose.model("Session");

  const enrolledSessions = await Session.countDocuments({
    "learners.learner": this._id,
    isActive: true,
  });

  const completedSessions = await Session.countDocuments({
    "learners.learner": this._id,
    "learners.attendanceStatus": "attended",
    status: "completed",
  });

  const upcomingSessions = await Session.countDocuments({
    "learners.learner": this._id,
    "learners.attendanceStatus": "enrolled",
    scheduledTime: { $gt: new Date() },
  });

  const cancelledSessions = await Session.countDocuments({
    "learners.learner": this._id,
    "learners.attendanceStatus": "cancelled",
  });

  return {
    enrolledSessions,
    completedSessions,
    upcomingSessions,
    cancelledSessions,
    attendanceRate:
      enrolledSessions > 0
        ? ((completedSessions / enrolledSessions) * 100).toFixed(2)
        : 0,
  };
};

// Instance method to get all mentors interacted with
learnerSchema.methods.getMentors = async function () {
  const Session = mongoose.model("Session");
  const sessions = await Session.find({
    "learners.learner": this._id,
    isActive: true,
  }).populate("mentor", "name email expertise rating");

  const mentorIds = [
    ...new Set(sessions.map((session) => session.mentor._id.toString())),
  ];
  const mentors = sessions
    .map((session) => session.mentor)
    .filter(
      (mentor, index, arr) =>
        arr.findIndex((m) => m._id.toString() === mentor._id.toString()) ===
        index
    );

  return mentors;
};

module.exports = mongoose.model("Learner", learnerSchema);
