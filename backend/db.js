const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err.message));
}

module.exports = connectDB;