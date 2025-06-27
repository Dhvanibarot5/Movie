const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MovieDatabase");

const connection = mongoose.connection;

connection.once("open", function (error) {
  if (error) console.log(error);
  else console.log("Database connected");
});

module.exports = connection;
