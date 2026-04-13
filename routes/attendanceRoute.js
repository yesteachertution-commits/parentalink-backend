const { saveAttendance } = require("../controller/attaendanceController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const rejectParent = require("../middleware/rejectParent");

router.post("/attendance", authMiddleware, rejectParent, saveAttendance);

module.exports = router;
