// routes/notRoutes.js
const express = require("express");
const router = express.Router();
const {
  notifyAttendanceParent,
  notifyMarks,
} = require("../controller/notificationController"); // Correct path
const authMiddleware = require("../middleware/authMiddleware");
const rejectParent = require("../middleware/rejectParent");

// Route to send the notification
router.post("/notify-parents", authMiddleware, rejectParent, notifyAttendanceParent); // Correctly use sendNotification as a function
router.post("/notify-parents-mark", authMiddleware, rejectParent, notifyMarks);

module.exports = router;
