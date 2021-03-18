const saveFileInS3 = require("../utils/save-file-s3");
const formidable = require("formidable");
const AWS = require("../config/aws");
const fs = require("fs");
const path = require("path");
const db = require("../db");

const s3 = new AWS.S3();

const newSong_post = async (req, res, next) => {
	const form = new formidable.IncomingForm();
	const id = Date.now();
	form.parse(req, async (err, fields, files) => {
		if (err) return res.status(500).send("Unexpected error, try again");
		//Get fields and data
		const { name, genre, duration } = fields;
		const { audio, image } = files;
		//Check their size
		if (audio.size > 1 * 5e8) return res.status(400).send("File too large");
		if (image.size > 1 * 1e7) return res.status(400).send("File too large");
		//Read them
		const audioFile = fs.readFileSync(audio.path);
		const imageFile = fs.readFileSync(image.path);
		//Save files in S3 and get their url
		const imgUrl = await saveFileInS3(imageFile, name, `${name}-image`, id, image.type);
		const audioUrl = await saveFileInS3(audioFile, name, `${name}-audio`, id, audio.type);
		//Save in the DB
		await db.query(`INSERT INTO songs(user_id, songName, genre, image, audio, artist, duration)
		values(
			'${req.user.id}',
			'${name}',
			'${genre}',
			'${imgUrl}',
			'${audioUrl}',
			'${req.user.username}',
			'${duration}'
		)`);
		res.send();
	});
};

module.exports = {
	newSong_post,
};
