const { register, login, setAvatar, getAllUsers } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers);


module.exports = router;