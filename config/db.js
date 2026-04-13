const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbURI);
    console.log("DB is connected");
  } catch (err) {
    console.error("Connection failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
