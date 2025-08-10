const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Session title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    topic: {
      type: String,
      required: [true, "Session topic is required"],
      trim: true,
      maxlength: [100, "Topic cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Session description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: [true, "Mentor is required"],
      index: true,
    },
    learners: [
      {
        learner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Learner",
          required: true,
        },
        enrollmentDate: {
          type: Date,
          default: Date.now,
        },
        attendanceStatus: {
          type: String,
          enum: ["enrolled", "attended", "absent", "cancelled"],
          default: "enrolled",
        },
        feedback: {
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comment: {
            type: String,
            maxlength: [500, "Feedback comment cannot exceed 500 characters"],
          },
          submittedAt: Date,
        },
        cancelledAt: Date,
        notes: {
          type: String,
          maxlength: [1000, "Notes cannot exceed 1000 characters"],
        },
      },
    ],
    scheduledTime: {
      type: Date,
      required: [true, "Scheduled time is required"],
      index: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [15, "Duration must be at least 15 minutes"],
      max: [480, "Duration cannot exceed 8 hours"],
    },
    maxLearners: {
      type: Number,
      required: [true, "Maximum learners is required"],
      min: [1, "Maximum learners must be at least 1"],
      max: [50, "Maximum learners cannot exceed 50"],
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    sessionNotes: {
      type: String,
      maxlength: [2000, "Session notes cannot exceed 2000 characters"],
    },
    materials: [
      {
        title: String,
        url: String,
        type: {
          type: String,
          enum: ["document", "video", "link", "other"],
        },
      },
    ],
    tags: [
      {
        type: String,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],
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

// Virtual for current learner count
sessionSchema.virtual("currentLearnerCount").get(function () {
  return this.learners.filter(
    (learner) => learner.attendanceStatus !== "cancelled"
  ).length;
});

// Virtual for available spots
sessionSchema.virtual("availableSpots").get(function () {
  return this.maxLearners - this.currentLearnerCount;
});

// Virtual for isFull
sessionSchema.virtual("isFull").get(function () {
  return this.currentLearnerCount >= this.maxLearners;
});

// Indexes for better query performance
sessionSchema.index({ mentor: 1, isActive: 1, isArchived: 1 });
sessionSchema.index({ scheduledTime: 1, isActive: 1 });
sessionSchema.index({ status: 1, isActive: 1 });
sessionSchema.index({ "learners.learner": 1, isActive: 1 });

// Pre-save middleware to update timestamps
sessionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to validate mentor is active
sessionSchema.pre("save", async function (next) {
  if (this.isModified("mentor")) {
    const Mentor = mongoose.model("Mentor");
    const mentor = await Mentor.findById(this.mentor);
    if (!mentor || !mentor.isActive) {
      throw new Error("Mentor must be active to create or update sessions");
    }
  }
  next();
});

// Static method to find active sessions
sessionSchema.statics.findActive = function () {
  return this.find({ isActive: true, isArchived: false });
};

// Static method to find recent sessions
sessionSchema.statics.findRecent = function (limit = 5) {
  return this.find({
    isActive: true,
    isArchived: false,
  })
    .sort({ scheduledTime: -1 })
    .limit(limit)
    .populate("mentor", "name email expertise")
    .populate("learners.learner", "name email");
};

// Static method to find sessions by mentor
sessionSchema.statics.findByMentor = function (mentorId) {
  return this.find({
    mentor: mentorId,
    isActive: true,
    isArchived: false,
  })
    .sort({ scheduledTime: -1 })
    .populate("learners.learner", "name email skillLevel");
};

// Static method to find sessions by learner
sessionSchema.statics.findByLearner = function (learnerId) {
  return this.find({
    "learners.learner": learnerId,
    isActive: true,
    isArchived: false,
  })
    .sort({ scheduledTime: -1 })
    .populate("mentor", "name email expertise rating");
};

// Static method to find upcoming sessions
sessionSchema.statics.findUpcoming = function () {
  return this.find({
    scheduledTime: { $gt: new Date() },
    isActive: true,
    isArchived: false,
    status: "scheduled",
  })
    .sort({ scheduledTime: 1 })
    .populate("mentor", "name email expertise")
    .populate("learners.learner", "name email");
};

// Static method to find mentors with no active sessions
sessionSchema.statics.findMentorsWithNoActiveSessions = async function () {
  const Mentor = mongoose.model("Mentor");
  const activeSessions = await this.distinct("mentor", {
    isActive: true,
    isArchived: false,
    scheduledTime: { $gt: new Date() },
  });

  return Mentor.find({
    isActive: true,
    _id: { $nin: activeSessions },
  });
};

// Instance method to enroll a learner
sessionSchema.methods.enrollLearner = async function (learnerId) {
  // Check if learner is already enrolled
  const existingEnrollment = this.learners.find(
    (enrollment) => enrollment.learner.toString() === learnerId.toString()
  );

  if (existingEnrollment) {
    throw new Error("Learner is already enrolled in this session");
  }

  // Check if session is full
  if (this.isFull) {
    throw new Error("Session is full");
  }

  // Check if session is in the past
  if (this.scheduledTime < new Date()) {
    throw new Error("Cannot enroll in past sessions");
  }

  // Add learner to session
  this.learners.push({
    learner: learnerId,
    enrollmentDate: new Date(),
    attendanceStatus: "enrolled",
  });

  await this.save();

  // Update learner's total sessions count
  const Learner = mongoose.model("Learner");
  await Learner.findByIdAndUpdate(learnerId, {
    $inc: { totalSessionsAttended: 1 },
  });

  return this;
};

// Instance method to mark attendance
sessionSchema.methods.markAttendance = async function (
  learnerId,
  status,
  notes = ""
) {
  const learnerEnrollment = this.learners.find(
    (enrollment) => enrollment.learner.toString() === learnerId.toString()
  );

  if (!learnerEnrollment) {
    throw new Error("Learner is not enrolled in this session");
  }

  learnerEnrollment.attendanceStatus = status;
  if (notes) {
    learnerEnrollment.notes = notes;
  }

  await this.save();
  return this;
};

// Instance method to add feedback
sessionSchema.methods.addFeedback = async function (
  learnerId,
  rating,
  comment
) {
  const learnerEnrollment = this.learners.find(
    (enrollment) => enrollment.learner.toString() === learnerId.toString()
  );

  if (!learnerEnrollment) {
    throw new Error("Learner is not enrolled in this session");
  }

  learnerEnrollment.feedback = {
    rating,
    comment,
    submittedAt: new Date(),
  };

  await this.save();

  // Update mentor's average rating
  const Mentor = mongoose.model("Mentor");
  const mentor = await Mentor.findById(this.mentor);
  if (mentor) {
    const feedbacks = this.learners
      .filter((l) => l.feedback && l.feedback.rating)
      .map((l) => l.feedback.rating);

    if (feedbacks.length > 0) {
      const averageRating =
        feedbacks.reduce((sum, rating) => sum + rating, 0) / feedbacks.length;
      mentor.rating = averageRating;
      await mentor.save();
    }
  }

  return this;
};

// Instance method to archive session
sessionSchema.methods.archive = async function () {
  this.isArchived = true;
  this.isActive = false;
  await this.save();
  return this;
};

// Instance method to get session statistics
sessionSchema.methods.getStats = function () {
  const totalEnrolled = this.learners.length;
  const attended = this.learners.filter(
    (l) => l.attendanceStatus === "attended"
  ).length;
  const absent = this.learners.filter(
    (l) => l.attendanceStatus === "absent"
  ).length;
  const cancelled = this.learners.filter(
    (l) => l.attendanceStatus === "cancelled"
  ).length;
  const enrolled = this.learners.filter(
    (l) => l.attendanceStatus === "enrolled"
  ).length;

  const feedbacks = this.learners
    .filter((l) => l.feedback && l.feedback.rating)
    .map((l) => l.feedback.rating);

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, rating) => sum + rating, 0) / feedbacks.length
      : 0;

  return {
    totalEnrolled,
    attended,
    absent,
    cancelled,
    enrolled,
    attendanceRate:
      totalEnrolled > 0 ? ((attended / totalEnrolled) * 100).toFixed(2) : 0,
    averageRating: averageRating.toFixed(2),
    feedbackCount: feedbacks.length,
  };
};

module.exports = mongoose.model("Session", sessionSchema);
