const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// PLAN
// -- UPDATE USER

router.put("/:id", async (req, res) => {
	const { id, password, isAdmin } = req.body;
	if (id == req.params.id || isAdmin) {
		if (password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = password = await bcrypt.hash(password, salt);
			} catch (error) {}
		}
		try {
			const user = await User.findByIdAndDelete(id, req.body);
			res.status(200).json("Account has been updated");
		} catch (error) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can update only your account");
	}
});

// -- DELETE USER

router.delete("/:id", async (req, res) => {
	const { userId, password, isAdmin } = req.body;
	if (userId == req.params.id || isAdmin) {
		try {
			const user = await User.findByIdAndDelete(id);
			res.status(200).json("Account has been Deleted");
		} catch (error) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can delete only your account");
	}
});

// -- GET USER

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(err).json(err);
	}
});

// -- FOLLOW USER

router.put("/:id/follow", async (req, res) => {
	if (req.body.userId != req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("User has been followed");
			} else {
				res.status(403).json("You already follow this user");
			}
		} catch (error) {}
	} else {
		res.status(200).json("You can not follow yourself");
	}
});

// -- UNFOLLOW USER

router.get("/", (req, res) => {});

module.exports = router;
