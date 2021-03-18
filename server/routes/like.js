const router = require("express").Router();
const likeController = require("../controllers/like");

router.post("/", likeController.setLike_post);

module.exports = router;
