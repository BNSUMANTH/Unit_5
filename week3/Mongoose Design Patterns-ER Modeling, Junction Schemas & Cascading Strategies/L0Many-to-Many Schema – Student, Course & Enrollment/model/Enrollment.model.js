const mongoose = require("mongoose");

const enrollScheema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Enroll=mongoose.model("Enroll",enrollScheema)

module.exports=Enroll

