const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, min: 3, max: 20, unique: true },
		email: { type: String, required: true, mix: 50, unique: true },
		password: { type: String, required: true, min: 6 },
		profilePicture: { type: String, default: "" },
		coverPicture: { type: String, default: "" },
		followers: { type: Array, default: [] },
		followins: { type: Array, default: [] },
		isAdmin: { type: Boolean, default: false },
		desc: { type: String, max: 70 },
		city: { type: String, max: 30 },
		from: { type: String, max: 30 },
		relationship: { type: Number, enum: [1, 2, 3] },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
