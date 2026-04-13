const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    mobile: { type: String, required: true },
    classes: { type: String },
    attendance: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // 👈 Add this
    date: { type:String },
})

module.exports = mongoose.model("Attendance", attendanceSchema);