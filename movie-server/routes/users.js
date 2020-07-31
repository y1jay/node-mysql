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
  userPhotoUpload,
} = require("../controllers/users");

const router = express.Router();

router.route("/").post(signUp).get(auth, getMyInfo).delete(auth, dethUser);
router.route("/login").post(LoginUser);
router.route("/change").post(changePasswd);
router.route("/logout").post(auth, Logout);
router.route("/logoutall").post(auth, LogoutAll);
router.route("/forgotpasswd").post(auth, forgotPasswd);
router.route("/resetPasswd/:resetPasswdToken").post(auth, resetPasswd);
router.route("/me/photo").put(auth, userPhotoUpload);
module.exports = router;
