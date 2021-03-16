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
		if (err) return res.send(err);
		const { name, genre } = fields;
		const { audio, image } = files;
		const audioFile = fs.readFileSync(audio.path);
		const imageFile = fs.readFileSync(image.path);

		const imgUrl = await saveFileInS3(imageFile, name, `${name}-image`, id, image.type);
		const audioUrl = await saveFileInS3(audioFile, name, `${name}-audio`, id, audio.type);
		await db.query(`INSERT INTO songs(user_id, songName, genre, imgUrl, audioUrl, artist)
		values(
			'${req.user.id}',
			'${name}',
			'${genre}',
			'${imgUrl}',
			'${audioUrl}',
			'${req.user.username}'
		)`);
		res.send("");
	});
};

module.exports = {
	newSong_post,
};
