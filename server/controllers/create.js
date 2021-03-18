const saveFileInS3 = require("../utils/save-file-s3");
const formidable = require("formidable");
const fs = require("fs");
const Song = require("../models/song");
const User = require("../models/user");

const newSong_post = async (req, res, next) => {
	const form = new formidable.IncomingForm();
	const id = Date.now();
	form.parse(req, async (err, fields, files) => {
		if (err) return res.status(500).send("Unexpected error, try again");
		//Get fields and data
		const { songName, genre, duration } = fields;
		const { audio, image } = files;
		//Check their size
		if (audio.size > 1 * 5e8) return res.status(400).send("File too large");
		if (image.size > 1 * 1e7) return res.status(400).send("File too large");
		//Read them
		const audioFile = fs.readFileSync(audio.path);
		const imageFile = fs.readFileSync(image.path);
		//Save files in S3 and get their url
		const directory = (type) => `songs/${songName}-${id}/${songName}-${type}`;
		const imgUrl = await saveFileInS3(imageFile, directory("image"), image.type);
		const audioUrl = await saveFileInS3(audioFile, directory("audio"), audio.type);
		//Save in the DB
		const newSong = new Song({
			songName,
			genre,
			artist: req.user.username,
			duration: JSON.parse(duration),
			image: imgUrl,
			audio: audioUrl,
		});
		await newSong.save();
		const user = await User.findById(req.user.id);
		user.songs.push(newSong.id);
		user.save();
		res.send();
	});
};

const newPlaylist_post = async (req, res) => {
	const form = new formidable.IncomingForm();
	const id = Date.now();
	form.parse(req, async (err, fields, files) => {
		if (err) return res.status(500).send("Unexpected error, try again");
		//Get fields and data
		const { name, description } = fields;
		const { image } = files;
		//Check their size
		if (image.size > 1 * 1e7) return res.status(400).send("File too large");
		//Read them
		const imageFile = fs.readFileSync(image.path);
		//Save files in S3 and get their url
		const directory = () => `playlist/${req.user.id}/${name}-${id}/${name}`;
		const imgUrl = await saveFileInS3(imageFile, directory(), image.type);
		//Save in the DB
		// await db.query(`INSERT INTO playlist(user_id, songName, genre, image, audio, artist, duration)
		// values(
		// 	'${req.user.id}',
		// 	'${name}',
		// 	'${genre}',
		// 	'${imgUrl}',
		// 	'${audioUrl}',
		// 	'${req.user.username}',
		// 	'${duration}'
		// )`);
		res.send();
	});
};

module.exports = {
	newSong_post,
	newPlaylist_post,
};
