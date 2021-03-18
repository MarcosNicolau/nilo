const LocalStrategy = require("passport-local").Strategy;
const { compare } = require("bcrypt");
const User = require("../models/user");

const passportLocalStrategy = (passport) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			const user = await User.findOne({ username });
			if (!user) return done(null, false, { message: "Incorrect Fields." });
			const isPasswordCorrect = await compare(password, user.password);
			if (!isPasswordCorrect) return done(null, false, { message: "Incorrect Fields." });

			return done(null, user);
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await User.findById(id);
		done(null, user);
	});
};

module.exports = passportLocalStrategy;
