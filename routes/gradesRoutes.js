const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");
const authMiddleware = require("../middleware/authMiddleware");
const rejectParent = require("../middleware/rejectParent");

// POST /api/grades/update — save or update marks for a student
router.post("/update", authMiddleware, rejectParent, async (req, res) => {
  try {
    const { studentName, fatherMobile, subject, marks, total, date, classes } = req.body;

    if (!studentName || !fatherMobile || !subject) {
      return res.status(400).json({ error: "studentName, fatherMobile, and subject are required" });
    }

    const result = marks == null || total == null ? "Absent" : `${marks} out of ${total}`;
    const attendance = marks == null || total == null ? "Absent" : "Present";

    // Upsert: update if same student+subject+date exists, else create
    const saved = await Marks.findOneAndUpdate(
      { studentName, fatherMobile, subject, date: date || null },
      {
        studentName,
        fatherMobile,
        subject,
        marks: marks ?? "",
        total: total ?? "",
        result,
        attendence: attendance,
        classes: classes || "",
        date: date || null,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Marks saved successfully", data: saved });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/grades — fetch all marks for the school's students
router.get("/", authMiddleware, rejectParent, async (req, res) => {
  try {
    const { subject, date } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (date) filter.date = date;

    const marks = await Marks.find(filter).sort({ date: -1 });
    res.status(200).json(marks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
