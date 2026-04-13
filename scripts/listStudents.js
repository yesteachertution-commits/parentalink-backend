require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const docs = await mongoose.connection.db.collection('students').find({}).toArray();
  docs.forEach(d => console.log(`${d.name} | _id: ${d._id} | rollNo: "${d.rollNo}" | createdBy: ${d.createdBy}`));
  mongoose.disconnect();
});
