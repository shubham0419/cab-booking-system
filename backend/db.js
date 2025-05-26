const mongoose = require("mongoose");

const connection = {};

async function connectDB() {
  // Check if already connected (in Next.js, connections can be dropped and re-established)
  if (connection.isConnected) {
    console.log("Connection to Database already established");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "", {});
    connection.isConnected = db.connections[0].readyState; // returns a number
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to Database", error);
    process.exit(1);
  }
}

module.exports = connectDB;
