const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const PORT = 7770;

dotenv.config();

app.listen(PORT, () => {
	console.log("Backend is running");
});
