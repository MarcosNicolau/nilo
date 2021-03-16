const router = require("express").Router();
const songsController = require("../controllers/songs");

router.get("/my-songs", songsController.mySongs_get);

module.exports = router;
