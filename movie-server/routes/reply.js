const express = require("express");
const auth = require("../middleware/auth");
const {
  comment,
  ALLreply,
  update_reply,
  delete_reply,
} = require("../controllers/reply");

const router = express.Router();

// /api/v1/reply
router.route("/").post(auth, comment);
router.route("/ALLreply").get(ALLreply);
router.route("/update").put(auth, update_reply);
router.route("/delete_reply").delete(auth, delete_reply);
module.exports = router;
