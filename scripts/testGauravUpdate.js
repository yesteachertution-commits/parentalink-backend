require('dotenv').config();
const mongoose = require('mongoose');
const Students = require('../models/Students');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const student = await Students.findOne({ name: 'Gaurav sharma' });
  console.log('ID:', student._id.toString());
  console.log('createdBy:', student.createdBy?.toString());
  console.log('rollNo before:', student.rollNo);

  // Simulate exactly what the controller does
  await mongoose.connection.db.collection('students').updateOne(
    { _id: student._id },
    { $set: { rollNo: 'TEST-GAURAV' } }
  );

  const after = await Students.findById(student._id);
  console.log('rollNo after:', after.rollNo);

  // Reset
  await mongoose.connection.db.collection('students').updateOne(
    { _id: student._id },
    { $set: { rollNo: '' } }
  );
  mongoose.disconnect();
});
