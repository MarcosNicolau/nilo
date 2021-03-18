const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passportLocalStrategy = require("./config/passport");
const authRoutes = require("./routes/auth");
const createRoutes = require("./routes/create");
const songsRoutes = require("./routes/songs");
const likeRoutes = require("./routes/like");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const db = process.env.DB;

mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => app.listen(PORT), console.log(`server listening on ${PORT}`))
	.catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
passportLocalStrategy(passport);

//ROUTES
app.use("/auth", authRoutes);
app.use("/create", createRoutes);
app.use("/songs", songsRoutes);
app.use("/like", likeRoutes);
