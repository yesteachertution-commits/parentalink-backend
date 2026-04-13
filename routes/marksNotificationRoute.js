const marksNotification = require("../controller/marksNotification");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const rejectParent = require("../middleware/rejectParent");

router.post("/send-marks", authMiddleware, rejectParent, marksNotification);
module.exports = router;
