const router = require("express").Router();
const shuffleArray = require("../utils/shuffle");
const Post = require("../models/Post");
const User = require("../models/User");

// PLAN

// -- CREATE POST

router.post("/", async (req, res) => {
	const newPost = await new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

// -- UPDATE POST

router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		console.log(post);
		if (post.userId == req.body.userId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json("Post has been updated");
		} else {
			res.status(403).json("You can update only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// -- DELETE POST

router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId == req.body.userId) {
			await post.deleteOne();
			res.status(200).json("Post has been deleted");
		} else {
			res.status(403).json("You can delete only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// -- LIKE / DISLIKE POST

router.put("/:id/like", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("Post has been liked");
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("Post has been disliked");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// -- GET TIMELINE POSTS

router.get("/timeline/all", async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		res.json(shuffleArray(userPosts.concat(...friendPosts)));
	} catch (error) {
		res.status(500).json(error);
	}
});

// -- GET POST

router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
