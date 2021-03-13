const db = require("../db");
const { hash } = require("bcrypt");
const passport = require("passport");

const isUserConnected_get = (req, res) => {
	if (!req.user) return res.send(false);
	res.send({
		username: req.user.username,
	});
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
	if (isUsernameTaken.length) return res.status(400).send("Username already taken");

	const hashedPassword = await hash(password, 12);
	await db.query(
		`INSERT INTO 
			users(username, password) 
			value('${username.toLowerCase()}', '${hashedPassword}')
		`
	);
	res.send("/");
};

const logIn_post = (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).send("Complete the form please");

	passport.authenticate("local", (err, user, message) => {
		if (message) return res.status(400).send(message.message);
		if (user)
			return req.logIn(user, (err) => {
				if (err) return console.log(err);
				res.send("/");
			});
	})(req, res);
};

module.exports = {
	isUserConnected_get,
	checkUsernameAvailability_post,
	signIn_post,
	logIn_post,
};
