const mysql = require("mysql2/promise");
require("dotenv").config();
const db = mysql.createPool({
	host: "localhost",
	user: "marcos",
	password: process.env.DB_PASSWORD,
	database: "nilo",
});

module.exports = db;
