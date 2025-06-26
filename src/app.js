const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("./config/db");
const routes = require("./routes/routes.js");
const { connect } = require("http2");

const app = express();

require("dotenv").config();

connectDB();
const port = process.env.PORT || 5000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`server starts on =====> http://localhost:${port}`);
});