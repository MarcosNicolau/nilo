const LocalStrategy = require("passport-local").Strategy;
const { compare } = require("bcrypt");
const db = require("../db");

const passportLocalStrategy = (passport) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			const [user] = await db.query(`SELECT * FROM users WHERE username = '${username}'`);
			if (!user.length) return done(null, false, { message: "Incorrect Fields." });
			const isPasswordCorrect = await compare(password, user[0].password);
			if (!isPasswordCorrect) return done(null, false, { message: "Incorrect Fields." });

			return done(null, user[0]);
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		const [user] = await db.query(`SELECT * FROM users WHERE id = '${id}'`);
		done(null, user[0]);
	});
};

module.exports = passportLocalStrategy;
