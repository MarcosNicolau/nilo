const router = require("express").Router();
const songsController = require("../controllers/songs");

router.get("/my-songs", songsController.mySongs_get);
router.get("/liked-songs", songsController.likedSongs_get);
router.post("/set-recently-played", songsController.setRecentlyPlayed_post);

module.exports = router;
