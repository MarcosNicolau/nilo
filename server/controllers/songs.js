const db = require("../db");
const mySongs_get = async (req, res) => {
	const id = req.user.id;
	const [mySongs] = await db.query(
		`SELECT songs.id, artist, songName, imgUrl, audioUrl, genre FROM users INNER JOIN songs ON '${id}' = songs.user_id`
	);
	res.send(mySongs);
};

module.exports = {
	mySongs_get,
};
