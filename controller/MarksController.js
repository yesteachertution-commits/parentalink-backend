const Marks = require("../models/Marks");

const marksTracker = async (req, res) => {
  try {
    const { grades } = req.body;

    if (!grades || !Array.isArray(grades)) {
      return res.status(400).json({ error: "Grades array is required" });
    }

    const savedEntries = [];

    for (let grade of grades) {
      const { studentName, fatherMobile, subject, marks, total } = grade;

      if (!studentName || !fatherMobile || !subject) {
        return res.status(400).json({
          error: "Student name, father mobile, and subject are required",
        });
      }

      const result =
        marks == null || total == null ? "Absent" : `${marks} out of ${total}`;
      const attendance = marks == null || total == null ? "Absent" : "Present";

      const newEntry = new Marks({
        studentName,
        fatherMobile,
        subject,
        marks: marks ?? "",
        total: total ?? "",
        result,
        attendence: attendance,
      });

      const saved = await newEntry.save();
      savedEntries.push(saved);
    }

    res
      .status(201)
      .json({ message: "Marks recorded successfully", data: savedEntries });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = marksTracker;
