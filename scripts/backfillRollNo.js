require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const col = mongoose.connection.db.collection('students');

  const result = await col.updateMany(
    { rollNo: { $exists: false } },
    { $set: { rollNo: '' } }
  );
  console.log('Backfilled:', result.modifiedCount, 'students');

  const docs = await col.find({}).toArray();
  docs.forEach(d => console.log(d.name, '| rollNo:', JSON.stringify(d.rollNo)));

  mongoose.disconnect();
});
