const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { createUser, Login_user, my_info } = require("../controllers/users");

router.route("/signUp").post(createUser);
router.route("/logIn").post(Login_user);
router.route("/me").get(auth, my_info);
module.exports = router;
