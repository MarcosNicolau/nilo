const db = require("../db");
const mySongs_get = async (req, res) => {
	const id = req.user.id;
	const [mySongs] = await db.query(
		`SELECT songs.id, artist, songName, image, audio, genre, duration, liked_songs FROM users 
		INNER JOIN songs ON '${id}' = songs.user_id 
		INNER JOIN likes ON '${id}' = likes.user_id
		ORDER BY created_at DESC`
	);
	const setParams = mySongs.map((song, index) => {
		const isLiked = song.liked_songs.find((like) => like === song.id.toString());
		return {
			...song,
			index,
			isLiked: isLiked ? true : false,
		};
	});
	res.send(setParams);
};

module.exports = {
	mySongs_get,
};
