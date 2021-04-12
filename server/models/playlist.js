const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
	playlistName: {
		required: true,
		type: String,
	},
	playlistDescription: String,
	image: {
		required: true,
		type: String,
	},
	songs: Array,
	likes: Number,
});

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
