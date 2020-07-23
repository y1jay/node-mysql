const express = require("express");
const auth = require("../middleware/auth");
const {
  createUser,
  LoginUser,
  updatePasswd,
  getMyInfo,
} = require("../controllers/users");

const router = express.Router();

router.route("/").post(createUser).get(auth, getMyInfo);
router.route("/login").post(LoginUser);
router.route("/change").post(updatePasswd);

module.exports = router;
