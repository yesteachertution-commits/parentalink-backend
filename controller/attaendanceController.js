const Students = require('../models/Students');

const saveAttendance = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { students, date } = req.body;

        if (!date || !Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "date and students array are required" });
        }

        const results = [];

        for (const student of students) {
            const { id, attendance } = student;

            if (!id || !attendance) continue;

            const updated = await Students.findOneAndUpdate(
                { _id: id, createdBy: userId },
                { $set: { [`attendance.${date}`]: attendance } },
                { new: true }
            );

            if (updated) results.push(updated);
        }

        res.status(200).json({ message: "Attendance saved successfully", results });
    } catch (error) {
        console.error("Error saving attendance:", error);
        res.status(500).json({ message: "Failed to save attendance", error: error.message });
    }
};

module.exports = { saveAttendance };
