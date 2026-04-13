const {
  userSignupController,
  loginController,
  getProfile,
  updateProfile,
} = require("../controller/userAuthController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", userSignupController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
