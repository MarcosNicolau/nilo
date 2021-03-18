const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		required: true,
		type: String,
	},
	password: {
		require: true,
		type: String,
	},
	songs: Array,
	likes: Array,
	playlists: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
