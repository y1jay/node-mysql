const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  getMemos,
  createMemo,
  updateMemo,
  deleteMemo,
  createUser,
} = require("../controllers/memos");
const { createUser } = require("../controllers/users");

router.route("/").get(getMemos).post(createMemo);
router.route("/:id").put(updateMemo).delete(deleteMemo);
router.route("/signup").post(createUser);
module.exports = router;
