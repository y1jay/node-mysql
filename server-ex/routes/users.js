const express = require("express");
const {
  createUser,
  LoginUser,
  updatePasswd,
  getMyInfo,
} = require("../controllers/users");

const router = express.Router();

router.route("/").post(createUser);
router.route("/login").post(LoginUser);
router.route("/change").post(updatePasswd);
router.route("/:id").get(getMyInfo);
module.exports = router;
