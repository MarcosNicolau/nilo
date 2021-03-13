const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
require("./db-connection");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//ROUTES
app.use("/auth", authRoutes);
