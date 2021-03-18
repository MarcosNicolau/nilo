const User = require("../models/user");
const Song = require("../models/song");

const mySongs_get = async (req, res) => {
	const id = req.user.id;
	const userSongs = await User.findById(id);
	const mySongs = [];
	for await (songId of userSongs.songs) {
		const song = await Song.findById(songId);
		mySongs.push(song);
	}
	const setParams = mySongs
		.map((song, index) => {
			const isLiked = userSongs.likes.find((like) => like === song._id.toString());
			return {
				...song._doc,
				index,
				isLiked: isLiked ? true : false,
			};
		})
		.reverse();
	res.send(setParams);
};

const likedSongs_get = async (req, res) => {
	const id = req.user.id;
	const userLikes = await User.findById(id);
	const likedSongs = [];
	for await (like of userLikes.likes) {
		const song = await Song.findById(like);
		likedSongs.push(song);
	}
	const setParams = likedSongs
		.map((song, index) => {
			return {
				...song._doc,
				index,
				isLiked: true,
			};
		})
		.reverse();
	res.send(setParams);
};

module.exports = {
	mySongs_get,
	likedSongs_get,
};
