const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: String,
		},
		sender: {
			type: String,
		},
		text: {
			type: String,
		},
		img: {
			type: String,
		},
		gif: {
			type: String,
		},
		audio: {
			type: String,
		},
		video: {
			type: String,
		},
		replyTo: {
			type: String,
			default: null,
		},
		like: {
			type: Number,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
