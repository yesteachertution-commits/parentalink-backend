const { sendWhatsAppNotification } = require("../services/whatsappService");

const notifyAttendanceParent = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { students, date } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "No student data provided" });
    }

    const results = [];

    for (const student of students) {
      const { name, mobile, classes, attendance } = student;

      if (!name || !mobile || !classes || !attendance) {
        continue; // skip invalid entries
      }

      // Use provided attendance value (e.g. Present/Absent/Late/Holiday)
      const attendanceStatus = String(attendance).trim();

      const result = await sendWhatsAppNotification(mobile, name, attendanceStatus);
      results.push({ mobile, status: "sent", result });
    }

    res.status(200).json({ message: "Notifications sent", results });
  } catch (error) {
    console.error("WhatsApp Error:", error);
    res.status(500).json({ message: "Failed to send WhatsApp notification", error: error.message });
  }
};

// notify Marks

const notifyMarks = async (req, res) => {
  try {
    const { students, date } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "No student data provided" });
    }

    const results = [];

    for (const student of students) {
      const { name, mobile, classes, subject, marks, total } = student;

      if (!name || !mobile || !classes || !subject || total == null) {
        continue; // skip invalid entries
      }

      // Allow '0' and empty string for marks but not undefined/null
      if (marks == null) {
        continue;
      }

      const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // TODO: Marks WhatsApp notification — will be implemented in v2
      // const result = await sendWhatsAppMarksNotification(mobile, name, subject, marks, total, classes, formattedDate);
      const result = { status: "skipped", reason: "marks notifications coming in v2" };
      results.push({ mobile, status: "sent", result });
    }

    return res.status(200).json({ message: "Notifications sent", results });
  } catch (err) {
    console.error("Error in notifyMarks:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { notifyAttendanceParent, notifyMarks };
