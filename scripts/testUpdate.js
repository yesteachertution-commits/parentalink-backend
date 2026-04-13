require('dotenv').config();
const mongoose = require('mongoose');
const Students = require('../models/Students');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // Find saurav and try to update rollNo directly
  const student = await Students.findOne({ name: 'saurav' });
  console.log('Found:', student._id.toString(), '| rollNo before:', student.rollNo);

  await mongoose.connection.db.collection('students').updateOne(
    { _id: student._id },
    { $set: { rollNo: 'DIRECT-TEST' } }
  );

  const after = await Students.findById(student._id);
  console.log('rollNo after raw update:', after.rollNo);

  // Reset
  await mongoose.connection.db.collection('students').updateOne(
    { _id: student._id },
    { $set: { rollNo: '' } }
  );
  console.log('Reset done');
  mongoose.disconnect();
});
