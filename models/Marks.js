const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  // MarksController posts `fatherMobile`; keep optional for older rows
  fatherMobile: { type: String },
  subject: { type: String, required: true },
  marks: { type: String, default: "" },
  total: { type: String, default: "" },
  result: { type: String },
  attendence: { type: String },
});

const Marks = mongoose.model("Marks", marksSchema);
module.exports = Marks;
