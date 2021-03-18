const router = require("express").Router();
const createController = require("../controllers/create");

router.post("/new-song", createController.newSong_post);
router.post("/new-playlist", createController.newPlaylist_post);

module.exports = router;
