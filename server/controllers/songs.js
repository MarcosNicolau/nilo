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
	const setParams = mySongs.reverse().map((song, index) => {
		const isLiked = userSongs.likes.find((like) => like === song._id.toString());
		return {
			...song._doc,
			index,
			isLiked: isLiked ? true : false,
		};
	});
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
	const setParams = likedSongs.reverse().map((song, index) => {
		return {
			...song._doc,
			index,
			isLiked: true,
		};
	});
	res.send(setParams);
};

const setRecentlyPlayed_post = async (req, res) => {
	const songId = req.body.songId;
	const user = await User.findById(req.user.id);
	const recentlyPlayed = user.recentlyPlayed;
	const isSongInTheList = recentlyPlayed.find((song) => song === songId);
	if (isSongInTheList) {
		const filterSong = recentlyPlayed.filter((song) => song !== songId);
		filterSong.push(songId);
		await user.updateOne({ recentlyPlayed: filterSong });
		return res.send();
	}
	if (recentlyPlayed.length > 10) recentlyPlayed.pop();
	recentlyPlayed.push(songId);
	await user.updateOne({ recentlyPlayed });
	res.send();
};

module.exports = {
	mySongs_get,
	likedSongs_get,
	setRecentlyPlayed_post,
};
