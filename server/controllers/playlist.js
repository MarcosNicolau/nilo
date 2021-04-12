const User = require("../models/user");
const Playlist = require("../models/playlist");
const Song = require("../models/song");

const getUserPlaylists_get = async (req, res) => {
	const id = req.user.id;
	const user = await User.findById(id);
	const playlists = [];
	for await (playlistId of user.playlists) {
		const playlist = await Playlist.findById(playlistId);
		playlists.push(playlist);
	}

	res.send(playlists);
};

const getPlaylist_get = async (req, res) => {
	const id = req.params.id;
	const playlist = await Playlist.findById(id);
	const user = await User.findById(req.user.id);

	const playlistSongs = [];
	for await (songId of playlist.songs) {
		const song = await Song.findById(songId);
		playlistSongs.push(song);
	}

	const setParams = playlistSongs.reverse().map((song, index) => {
		const isLiked = user.likes.find((like) => like === song._id.toString());
		return {
			...song._doc,
			index,
			isLiked: isLiked ? true : false,
		};
	});

	res.send({ playlist: setParams, playlistName: playlist.playlistName });
};

const addSong_post = async (req, res) => {
	const { playlistId, songId } = req.body;
	const playlist = await Playlist.findById(playlistId);
	const isSongAlreadyAdded = playlist.songs.find((song) => song === songId);
	if (isSongAlreadyAdded) return res.status(400).send("Song is already in the playlist");

	playlist.songs.push(songId);
	await playlist.save();
	res.send("Added");
};

const removeSong_post = async (req, res) => {
	const { playlistId, songId } = req.body;
	if (!playlistId || !songId) return res.status(400);
	const playlist = await Playlist.findById(playlistId);
	const filterSong = playlist.songs.filter((song) => song !== songId);
	await playlist.updateOne({ songs: filterSong });
	res.send("Done");
};

module.exports = {
	getUserPlaylists_get,
	getPlaylist_get,
	addSong_post,
	removeSong_post,
};
