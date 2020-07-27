const express = require("express");
const auth = require("../middleware/auth");
const {
  createUser,
  LoginUser,
  updatePasswd,
  getMyInfo,
  Logout,
  LogoutAll,
  dethUser,
} = require("../controllers/users");

const router = express.Router();

router.route("/").post(createUser).get(auth, getMyInfo).delete(auth, dethUser);
router.route("/login").post(LoginUser);
router.route("/change").post(updatePasswd);
router.route("/logout").post(auth, Logout);
router.route("/logoutall").post(auth, LogoutAll);

module.exports = router;
