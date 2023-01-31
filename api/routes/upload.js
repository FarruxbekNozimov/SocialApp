const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const { Readable } = require("stream");
const router = require("express").Router();

cloudinary.config({
	cloud_name: "dptkswr4w",
	api_key: "445832138674959",
	api_secret: "5qmb7zfL0PmoHz9qZ3ANya4VbVU",
});

const upload = multer();

router.post("/upload", upload.single("file"), function (req, res, next) {
	console.log(req.file);
	// let streamUpload = (req) => {
	// 	return new Promise((resolve, reject) => {
	// 		let stream = cloudinary.uploader.upload_stream((error, result) => {
	// 			if (result) {
	// 				resolve(result);
	// 			} else {
	// 				reject(error);
	// 			}
	// 		});

	// 		streamifier.createReadStream(req.file.buffer).pipe(stream);
	// 	});
	// };

	// async function upload(req) {
	// 	let result = await streamUpload(req);
	// 	console.log(result);
	// }

	// upload(req);
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'media'
//   }
// })
// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// const bufferToStream = (buffer) => {
// 	const readable = new Readable({
// 		read() {
// 			this.push(buffer);
// 			this.push(null);
// 		},
// 	});
// 	return readable;
// };

// router.post("/upload", upload.single("file"), async (req, res) => {
// 	console.log(req.file);
// 	const data = await sharp(req.file.buffer).toBuffer();
// 	const stream = cloudinary.uploader.upload_stream(
// 		{ folder: "media" },
// 		(error, result) => {
// 			if (error) return res.status(500).json(err);
// 			return res.status(200).json(req.file.path);
// 		}
// 	);
// 	bufferToStream(data).pipe(stream);
// });

module.exports = router;
