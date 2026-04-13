const MarksController = require("../controller/MarksController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const rejectParent = require("../middleware/rejectParent");

router.post("/marks", authMiddleware, rejectParent, MarksController);

module.exports = router;
