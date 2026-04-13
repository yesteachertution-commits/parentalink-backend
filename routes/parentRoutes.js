const express = require("express");
const router = express.Router();
const { parentLogin, getParentChild } = require("../controller/parentAuthController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");
const parentLoginRateLimit = require("../middleware/parentLoginRateLimit");

router.post("/login", parentLoginRateLimit, parentLogin);
router.get("/child", authMiddleware, requireRole("parent"), getParentChild);

module.exports = router;
