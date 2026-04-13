const sendSms = require("../services/smsService");
const marksTracker = require("./MarksController");

const notifyMarks = async (req, res) => {
  try {
    const { grades } = req.body;

    if (!Array.isArray(grades)) {
      return res.status(400).json({ error: "Grades array is required" });
    }

    const sentMessages = [];

    for (const grade of grades) {
      const { studentName, fatherMobile, subject, marks, total } = grade;
      const result = `${marks} out of ${total}`;
      const message = `Dear Parent, your child ${studentName} scored ${result} in ${subject}.`;

      await sendSms(fatherMobile, message);
      sentMessages.push({ to: fatherMobile, message });
    }

    res
      .status(200)
      .json({ message: "SMS notifications sent", data: sentMessages });
  } catch (error) {
    console.error("SMS error:", error);
    res.status(500).json({ error: error.message || "Failed to send SMS" });
  }
};
module.exports = notifyMarks;
