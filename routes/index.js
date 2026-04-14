const express = require("express");
const router = express.Router();

// Import your individual route files
const studentRoutes = require("./studentRoutes");
const notRoutes = require("./notRoutes"); // If you have another route like authRoutes
const marksRoutes = require("./marksRoutes");
const marksNotification = require("./marksNotificationRoute");
const userauthroutes = require("../routes/userauthRoutes");
const attendanceroutes = require("../routes/attendanceRoute");
const emailOtpRoutes = require("./emailOtpRoutes"); // Import the email OTP routes
const authkeyWebhookRoutes = require("./authkeyWebhookRoutes");
const parentRoutes = require("./parentRoutes");

const gradesRoutes = require("./gradesRoutes");

// Use the routes
router.use("/create", studentRoutes);
router.use("/notification", notRoutes);
router.use("/marks-get", marksRoutes);
router.use("/marks", marksNotification);
router.use("/grades", gradesRoutes);
router.use("/user", userauthroutes);
router.use("/save", attendanceroutes);
router.use("/email-otp", emailOtpRoutes);
router.use("/authkey-webhook", authkeyWebhookRoutes);
router.use("/parent", parentRoutes);

// You can add more routes in the same way

module.exports = router;
