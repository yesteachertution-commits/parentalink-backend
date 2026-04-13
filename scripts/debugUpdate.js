require('dotenv').config();
const mongoose = require('mongoose');
const Students = require('../models/Students');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const student = await Students.findOne({ name: 'saurav' });
  console.log('saurav _id:', student._id.toString());
  console.log('saurav createdBy:', student.createdBy?.toString());
  console.log('saurav rollNo:', student.rollNo);

  // Simulate exactly what updateStudent does
  const updateFields = {
    name: student.name,
    fatherName: student.fatherName,
    mobile: student.mobile,
    classes: student.classes,
    rollNo: '7868542',
  };

  await mongoose.connection.db.collection('students').updateOne(
    { _id: student._id },
    { $set: updateFields }
  );

  const after = await Students.findById(student._id);
  console.log('rollNo after:', after.rollNo);
  mongoose.disconnect();
});
