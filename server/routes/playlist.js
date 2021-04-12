const router = require("express").Router();
const playlistController = require("../controllers/playlist");

router.get("/", playlistController.getUserPlaylists_get);
router.get("/:id", playlistController.getPlaylist_get);
router.post("/add-song", playlistController.addSong_post);
router.post("/remove-song", playlistController.removeSong_post);
module.exports = router;
