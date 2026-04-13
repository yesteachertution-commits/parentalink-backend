require('dotenv').config();
const mongoose = require('mongoose');
const Students = require('../models/Students');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const col = mongoose.connection.db.collection('students');

  // 1. Show current state
  console.log('=== CURRENT DB STATE ===');
  const before = await col.find({}).toArray();
  before.forEach(d => console.log(`  ${d.name} | rollNo: "${d.rollNo}"`));

  // 2. Simulate PUT for Gaurav sharma
  const gaurav = before.find(d => d.name === 'Gaurav sharma');
  console.log('\n=== SIMULATING PUT for Gaurav sharma ===');
  await col.updateOne({ _id: gaurav._id }, { $set: { rollNo: 'G-001' } });

  // 3. Simulate GET (what Students.find returns)
  console.log('\n=== SIMULATING GET (Students.find) ===');
  const students = await Students.find({ createdBy: gaurav.createdBy });
  students.forEach(s => console.log(`  ${s.name} | rollNo: "${s.rollNo}"`));

  // Reset
  await col.updateOne({ _id: gaurav._id }, { $set: { rollNo: '' } });
  console.log('\nReset done.');
  mongoose.disconnect();
});
