const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
	playlistName: {
		required: true,
		type: String,
	},
	playlistImg: {
		required: true,
		type: String,
	},
	songs: {
		required: true,
		type: Array,
	},
});

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
