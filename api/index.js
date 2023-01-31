const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// ROUTERS
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const conversationsRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { Readable } = require("stream");

app.use(cors());
dotenv.config();
app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

cloudinary.config({
	cloud_name: "dptkswr4w",
	api_key: "445832138674959",
	api_secret: "5qmb7zfL0PmoHz9qZ3ANya4VbVU",
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'media'
//   }
// })
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const bufferToStream = (buffer) => {
	const readable = new Readable({
		read() {
			this.push(buffer);
			this.push(null);
		},
	});
	return readable;
};

app.post("/api/upload", upload.single("file"), async (req, res) => {
	console.log(req.file, req.body, req.files);
	// const data = await sharp(req.file.buffer).toBuffer();
	// const stream = cloudinary.uploader.upload_stream(
	// 	{ folder: "media" },
	// 	(error, result) => {
	// 		if (error) return console.error(error);
	// 	}
	// );
	// bufferToStream(data).pipe(stream);

	// try {
	// 	return req.file.path;
	// } catch (err) {
	// 	console.log("error", err);
	// 	return res.status(200).json(err);
	// }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messageRoute);

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
