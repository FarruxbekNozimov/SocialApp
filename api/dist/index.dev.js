"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var dotenv = require("dotenv");

var helmet = require("helmet");

var morgan = require("morgan");

var authRoute = require("./routes/auth");

var userRoute = require("./routes/users");

var postRoute = require("./routes/post");

var cors = require("cors");

app.use(cors());
dotenv.config(); // middleware

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

var startApp = function startApp() {
  try {} catch (error) {}

  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function () {
    return console.log("Connect to MongoDB");
  });
  var PORT = 7770;
  app.listen(PORT, function () {
    console.log("Backend is running", PORT);
  });
};

startApp();