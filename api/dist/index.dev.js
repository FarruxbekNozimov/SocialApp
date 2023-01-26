"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var dotenv = require("dotenv");

var helmet = require("helmet");

var morgan = require("morgan");

var PORT = 7770;
dotenv.config();
app.listen(PORT, function () {
  console.log("Backend is running");
});