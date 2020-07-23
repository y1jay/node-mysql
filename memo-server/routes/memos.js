const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  getMemos,
  createMemo,
  updateMemo,
  deleteMemo,

} = require("../controllers/memos");
const { createUser, Login_user } = require("../controllers/users");


router.route("/").get(getMemos).post(createMemo);
router.route("/:id").put(updateMemo).delete(deleteMemo);
router.route("/signUp").post(createUser);
router.route("/logIn").post(Login_user)
module.exports = router;
