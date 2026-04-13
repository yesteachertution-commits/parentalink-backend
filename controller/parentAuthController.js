const jwt = require("jsonwebtoken");
const Students = require("../models/Students");
const Marks = require("../models/Marks");
const { normalizeIndiaMobile } = require("../utils/mobile");

const parentLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      return res.status(400).json({ message: "mobile and password are required" });
    }

    const normalizedMobile = normalizeIndiaMobile(mobile);
    if (!normalizedMobile) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const rollNo = String(password).trim();
    const student = await Students.findOne({ mobile: normalizedMobile, rollNo });
    if (!student) {
      return res.status(401).json({ message: "Invalid mobile or roll number" });
    }

    const token = jwt.sign(
      {
        id: `parent:${student._id.toString()}`,
        role: "parent",
        studentId: student._id.toString(),
        name: `Parent of ${student.name}`,
        email: null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({ token });
  } catch (err) {
    console.error("parentLogin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getParentChild = async (req, res) => {
  try {
    const studentId = req.user?.studentId;
    if (!studentId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const student = await Students.findById(studentId).lean();
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const marks = await Marks.find({
      studentName: student.name,
      fatherMobile: student.mobile,
    }).lean();

    return res.status(200).json({ student: { ...student, marks } });
  } catch (err) {
    console.error("getParentChild error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { parentLogin, getParentChild };
