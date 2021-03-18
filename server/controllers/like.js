const db = require("../db");

const setLike_post = async (req, res) => {
	const { songId, isLiked } = req.body;
	if (!isLiked) {
		await db.query(
			`UPDATE likes SET liked_songs=JSON_ARRAY_APPEND(liked_songs, '$', '${songId}') WHERE '${req.user.id}' = id`
		);
		res.send(true);
	}
	if (isLiked) {
		await db.query(
			`UPDATE likes SET liked_songs=JSON_REMOVE(liked_songs, JSON_UNQUOTE(JSON_SEARCH(liked_songs, 'one', '${songId}'))) WHERE '${req.user.id}' = id`
		);
		res.send(false);
	}
};

module.exports = {
	setLike_post,
};
