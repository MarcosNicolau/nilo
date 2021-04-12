const User = require("../models/user");
const Song = require("../models/song");
const Playlist = require("../models/playlist");

const recentlyPlayed_get = async (req, res) => {
	const user = await User.findById(req.user.id);
	const recentlyPlayed = [];
	for await (songId of user.recentlyPlayed) {
		const song = await Song.findById(songId);
		recentlyPlayed.push(song);
	}
	res.send(recentlyPlayed);
};

const popularPlaylists_get = async (req, res) => {
	const popularPlaylists = await Playlist.aggregate([
		{ $project: { _id: 1, image: 1, playlistName: 1 } },
		{ $sort: { likes: -1 } },
		{ $limit: 10 },
	]);
	res.send(popularPlaylists);
};

module.exports = {
	recentlyPlayed_get,
	popularPlaylists_get,
};
