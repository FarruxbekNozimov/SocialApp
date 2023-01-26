const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// PLAN
// -- UPDATE USER

router.put("/:username", async (req, res) => {
	const { username, password } = req.body;
	if (username == req.params.username || req.user.isAdmin) {
		if (password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = password = await bcrypt.hash(password, salt);
			} catch (error) {}
		}
		try {
			const user = await User.findOneAndUpdate({ username }, req.body);
			res.status(200).json("Account has been updated");
		} catch (error) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can update only your account");
	}
});

// -- DELETE USER
// -- GET USER
// -- GET USER
// -- FOLLOW USER
// -- UNFOLLOW USER

router.get("/", (req, res) => {});

module.exports = router;
