const express = require("express");
const auth = require("../middleware/auth");
const {
  LoginUser,
  getMyInfo,
  Logout,
  LogoutAll,
  dethUser,
  forgotPasswd,
  resetPasswd,
  signUp,
  changePasswd,
  favorite_movie,
  my_movie,
  del,
} = require("../controllers/users");

const router = express.Router();

router.route("/").post(signUp).get(auth, getMyInfo).delete(auth, dethUser);
router.route("/login").post(LoginUser);
router.route("/change").post(changePasswd);
router.route("/logout").post(auth, Logout);
router.route("/logoutall").post(auth, LogoutAll);
router.route("/forgotpasswd").post(auth, forgotPasswd);
router.route("/resetPasswd/:resetPasswdToken").post(auth, resetPasswd);
router.route("/favorite").post(auth, favorite_movie);
router.route("/my_movie").get(auth, my_movie);
router.route("/del").delete(auth, del);
module.exports = router;
