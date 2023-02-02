const router = require("express").Router();
const Conversation = require("../models/Conversations");

// PLAN

//  -- CREATE NEW CONVERSATION

router.post("/", async (req, res) => {
	const { senderId, receiverId } = req.body;
	let conversations = await Conversation.find();
	for (let c in conversations) {
		if (
			conversations[c].members.includes(senderId) &&
			conversations[c].members.includes(receiverId)
		)
			return res.status(400).json("This conversation is already exists");
	}
	const newConversation = new Conversation({
		members: [senderId, receiverId],
	});

	try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (err) {
		res.status(500).json(err);
	}
});

//  -- GET CONVERSATION OF USER

router.get("/:userId", async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: req.params.userId },
		});
		res.status(200).json(conversation);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
