require('dotenv').config();
const mongoose = require('mongoose');
const Students = require('../models/Students');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const student = await Students.findOne({ name: 'Gaurav sharma' });
  console.log('ID:', student._id.toString());
  console.log('rollNo before:', student.rollNo);

  const updated = await Students.findByIdAndUpdate(
    student._id,
    { rollNo: 'TEST-99' },
    { new: true, runValidators: false }
  );
  console.log('rollNo after:', updated.rollNo);

  // Reset
  await Students.findByIdAndUpdate(student._id, { rollNo: '' }, { runValidators: false });
  console.log('Reset done.');
  mongoose.disconnect();
});
