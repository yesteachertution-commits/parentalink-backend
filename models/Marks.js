const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherMobile: { type: String },
  subject: { type: String, required: true },
  marks: { type: String, default: "" },
  total: { type: String, default: "" },
  result: { type: String },
  attendence: { type: String },
  classes: { type: String, default: "" },
  date: { type: String, default: null },
});

const Marks = mongoose.model("Marks", marksSchema);
module.exports = Marks;
