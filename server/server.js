const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passportLocalStrategy = require("./config/passport");
const authRoutes = require("./routes/auth");
const createRoutes = require("./routes/create");
const songsRoutes = require("./routes/songs");
const likeRoutes = require("./routes/like");
const passport = require("passport");
require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
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

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//ROUTES
app.use("/auth", authRoutes);
app.use("/create", createRoutes);
app.use("/songs", songsRoutes);
app.use("/like", likeRoutes);
