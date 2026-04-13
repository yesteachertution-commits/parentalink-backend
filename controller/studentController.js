const Students = require("../models/Students");
const { normalizeIndiaMobile } = require("../utils/mobile");

// Create one or more students
const createStudents = async (req, res) => {
  try {
    const userId = req.user?.id;

    let rawList;
    if (Array.isArray(req.body.students)) {
      rawList = req.body.students;
    } else if (req.body.students && typeof req.body.students === "object") {
      rawList = [req.body.students];
    } else {
      rawList = [req.body];
    }

    const toCreate = [];

    for (const data of rawList) {
      if (!data) continue;
      const { name, fatherName, mobile, classes, rollNo } = data;

      if (!name || !fatherName || !mobile || !classes) {
        return res.status(400).json({ message: "name, fatherName, mobile, and classes are required" });
      }

      const normalizedMobile = normalizeIndiaMobile(mobile);
      if (!normalizedMobile) {
        return res.status(400).json({ message: "Invalid mobile number" });
      }

      toCreate.push({
        name,
        fatherName,
        mobile: normalizedMobile,
        rollNo: rollNo ? String(rollNo).trim() : "",
        classes,
        createdBy: userId,
      });
    }

    if (toCreate.length === 0) {
      return res.status(400).json({ message: "No student data provided" });
    }

    const savedStudents = await Students.insertMany(toCreate, { ordered: false });
    return res.status(201).json(savedStudents.length === 1 ? savedStudents[0] : savedStudents);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all students for the logged-in school
const getStudents = async (req, res) => {
  try {
    const userId = req.user?.id;
    const students = await Students.find({ createdBy: userId });
    res.status(200).json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a student — including rollNo
const updateStudent = async (req, res) => {
  try {
    const { name, fatherName, mobile, classes, rollNo } = req.body;
    const studentId = req.params.id;
    const userId = req.user?.id;

    const student = await Students.findOne({ _id: studentId, createdBy: userId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (name) student.name = name;
    if (fatherName) student.fatherName = fatherName;
    if (classes) student.classes = classes;
    if (rollNo !== undefined) student.rollNo = String(rollNo).trim();

    if (mobile) {
      const normalizedMobile = normalizeIndiaMobile(mobile);
      if (!normalizedMobile) return res.status(400).json({ message: "Invalid mobile number" });
      student.mobile = normalizedMobile;
    }

    student.markModified('rollNo');
    const updated = await student.save();
    res.json({ success: true, updatedStudent: updated });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Students.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await Students.findByIdAndDelete(studentId);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createStudents, getStudents, updateStudent, deleteStudent };
