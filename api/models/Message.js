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
		isImg: {
			type: Boolean,
			default: false,
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
