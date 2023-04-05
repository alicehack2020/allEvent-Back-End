const mongoose = require("mongoose");

const connectDb = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connection successful!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
