const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  mobile: { type: String, required: true },
  rollNo: { type: String, default: "", trim: true },
  classes: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendance: {
    type: Map,
    of: String,
    default: {},
  },
});

const Students = mongoose.model("Students", studentSchema);

module.exports = Students;
