const router = require("express").Router();
const galleriesController = require("../controllers/galleries");

router.get("/recently-played", galleriesController.recentlyPlayed_get);
router.get("/popular-playlists", galleriesController.popularPlaylists_get);

module.exports = router;
