const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");

dotenv.config();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

let startApp = () => {
	try {
	} catch (error) {}
	mongoose.set("strictQuery", true);
	mongoose.connect(
		process.env.MONGOOSE_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		() => console.log("Connect to MongoDB")
	);
	const PORT = 7770;
	app.listen(PORT, () => {
		console.log("Backend is running", PORT);
	});
};

startApp();
