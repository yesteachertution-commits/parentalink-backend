require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const col = mongoose.connection.db.collection('students');

  // Remove the muskan that belongs to a different user (not 69ce1c15...)
  const result = await col.deleteOne({ 
    name: 'muskan ', 
    createdBy: new mongoose.Types.ObjectId('69d9292d4f734d67133436de') 
  });
  console.log('Deleted:', result.deletedCount, 'duplicate student');

  const remaining = await col.find({}).toArray();
  remaining.forEach(d => console.log(`${d.name} | createdBy: ${d.createdBy}`));

  mongoose.disconnect();
});
