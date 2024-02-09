const { register, login, setAvatar } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);


module.exports = router;