const router = require("express").Router();
const authController = require("../controllers/auth");

router.get("/is-user-connected", authController.isUserConnected_get);
router.post("/check-username-availability", authController.checkUsernameAvailability_post);
router.post("/sign-in", authController.signIn_post);
router.post("/login", authController.logIn_post);

module.exports = router;
