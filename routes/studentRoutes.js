const express = require("express");
const router = express.Router();
const { createStudents, getStudents, updateStudent, deleteStudent } = require("../controller/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const rejectParent = require("../middleware/rejectParent");

router.post("/students", authMiddleware, rejectParent, createStudents);
router.get("/students", authMiddleware, rejectParent, getStudents);
router.put("/students/:id", authMiddleware, rejectParent, updateStudent);
router.delete("/students/:id", authMiddleware, rejectParent, deleteStudent);

module.exports = router;
