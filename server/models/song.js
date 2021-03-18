const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
	songName: {
		required: true,
		type: String,
	},
	genre: {
		required: true,
		type: String,
	},
	artist: {
		required: true,
		type: String,
	},
	duration: {
		required: true,
		type: Object,
	},
	image: {
		required: true,
		type: String,
	},
	audio: {
		required: true,
		type: String,
	},
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
