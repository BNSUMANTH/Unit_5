const Course = require("../model/course.model");
const Enroll = require("../model/Enrollment.model");
const Student = require("../model/student.model");

const addstudent = async (req, res) => {
  try {
    const st = req.body;
    let data = await Student.insertOne(st);
    res.status(200).send({ msg: "successfully added", data });
  } catch (err) {
    res.status(400).send({ msg: "error" });
  }
};

const addcourse = async (req, res) => {
  try {
    const st = req.body;
    let data = await Course.insertOne(st);
    res.status(200).send({ msg: "successfully added", data });
  } catch (err) {
    res.status(400).send({ msg: "error" });
  }
};

const enroll = async (req, res) => {
  try {
    const st = req.body;
    let data = await Enroll.insertOne(st);
    res.status(200).send({ msg: "successfully added", data });
  } catch (err) {
    res.status(400).send({ msg: "error" });
  }
};

//delete
const isdelete = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await Student.findByIdAndUpdate(id, { isactive: false });

    await Enroll.updateMany({ studentId: id }, { $set: { isActive: false } });

    res.status(200).send({ msg: "successfully delete" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "error" });
  }
};
const isdeletecourse = async (req, res) => {
 try {
    let id = req.params.id;
    const data = await Course.findByIdAndUpdate(id, { isactive: false });
    await Enroll.updateMany({ studentId: id }, { $set: { isActive: false } });
    res.status(200).send({ msg: "successfully delete" });
  } catch (err) {
    res.status(400).send({ msg: "error" });
  }
};

const getcourse = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Enroll.find({ studentId: id }, { isActive: true });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ msg: "error" });
  }
};

const getstudents = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Enroll.find({ courseIdId: id }, { isActive: true });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ msg: "error" });
  }
};

module.exports = {
  addstudent,
  addcourse,
  enroll,
  isdelete,
  isdeletecourse,
  getcourse,
  getstudents,
};
