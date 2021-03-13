const db = require("../db-connection");
const { hash } = require("bcrypt");

const isUserConnected_get = (req, res) => {
	if (!req.user) return res.send(false);
};

const checkUsernameAvailability_post = async (req, res) => {
	const username = req.body.username;
	const [isUsernameTaken] = await db.query(
		`SELECT * FROM users WHERE username = '${username.toLowerCase()}'`
	);
	if (isUsernameTaken.length) return res.send("Username already taken");
	res.send("");
};

const signIn_post = async (req, res) => {
	const { username, password } = req.body;
	const [isUsernameTaken] = await db.query(
		`SELECT * FROM users WHERE username = '${username.toLowerCase()}'`
	);
	if (isUsernameTaken.length) return res.status(401).send("Username already taken");

	const hashedPassword = await hash(password, 12);
	await db.query(
		`INSERT INTO 
			users(username, password) 
			value('${username.toLowerCase()}', '${hashedPassword}')
		`
	);
	res.send("/");
};

module.exports = {
	isUserConnected_get,
	checkUsernameAvailability_post,
	signIn_post,
};
