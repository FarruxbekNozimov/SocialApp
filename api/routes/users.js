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

router.get("/", async (req, res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	console.log(userId, username);
	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(err).json(err);
	}
});

// -- GET FRIENDS

router.get("/friends/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const friends = await Promise.all(
			user.followings.map((friendId) => {
				return User.findById(friendId);
			})
		);
		let friendList = [];
		friends.map((friend) => {
			const { _id, username, profilePicture } = friend;
			friendList.push({ _id, username, profilePicture });
		});
		res.status(200).json(friendList);
	} catch (err) {
		res.status(500).json(err);
	}
});

// -- GET FOLLOWERS

router.get("/followers/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		user.followers = user.followers.filter((u) => user.followings.includes(u));
		const followers = await Promise.all(
			user.followers.map((followerId) => {
				return User.findById(followerId);
			})
		);
		let followerList = [];
		followers.map((follower) => {
			const { _id, username, profilePicture } = follower;
			followerList.push({ _id, username, profilePicture });
		});
		res.status(200).json(followerList);
	} catch (err) {
		res.status(500).json(err);
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

router.put("/:id/unfollow", async (req, res) => {
	console.log(req.body.userId, req.params.id);
	if (req.body.userId != req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });
				res.status(200).json("User has been unfollowed");
			} else {
				res.status(403).json("You dont follow this user");
			}
		} catch (error) {}
	} else {
		res.status(200).json("You can not unfollow yourself");
	}
});

module.exports = router;
