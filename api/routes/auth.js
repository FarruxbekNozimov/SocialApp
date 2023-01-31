const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
	console.log("salom");
	try {
		// GENRATE NEW PASSWORD
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// CREATE NEW USER AND RESPONSE
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
});

// LOGIN

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email && !password)
			return res.status(200).json("All fields are required");
		const user = await User.findOne({ email });
		if (!user) return res.status(200).json("User not found");
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) return res.status(200).json("Password is wrong");
		res.status(200).json(user);
	} catch (error) {
		res.status(200).json(error);
	}
});

module.exports = router;
