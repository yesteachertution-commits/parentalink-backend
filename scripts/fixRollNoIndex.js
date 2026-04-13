require("dotenv").config();
const mongoose = require("mongoose");

async function fix() {
  await mongoose.connect(process.env.MONGO_URI);
  const col = mongoose.connection.db.collection("students");

  const indexes = await col.indexes();
  console.log("Current indexes:", indexes.map(i => i.name));

  // Drop the unique index so multiple students can have empty rollNo
  for (const idx of indexes) {
    if (idx.name.includes("rollNo")) {
      try {
        await col.dropIndex(idx.name);
        console.log(`Dropped index: ${idx.name}`);
      } catch (e) {
        console.log(`Could not drop ${idx.name}:`, e.message);
      }
    }
  }

  // Backfill missing rollNo fields
  const result = await col.updateMany(
    { rollNo: { $exists: false } },
    { $set: { rollNo: "" } }
  );
  console.log(`Backfilled ${result.modifiedCount} students.`);

  await mongoose.disconnect();
  console.log("Done.");
}

fix().catch(console.error);
