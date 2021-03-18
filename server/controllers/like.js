const User = require("../models/user");

const setLike_post = async (req, res) => {
	const { songId, isLiked } = req.body;
	const user = await User.findById(req.user.id);
	if (!isLiked) {
		user.likes.push(songId);
		await user.save();
		res.send(true);
	}
	if (isLiked) {
		const removeLike = user.likes.filter((like) => like !== songId);
		await user.updateOne({ likes: removeLike });
		res.send(false);
	}
};

module.exports = {
	setLike_post,
};
