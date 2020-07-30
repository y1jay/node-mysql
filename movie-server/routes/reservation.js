const express = require("express");
const auth = require("../middleware/auth");
const {
  reservation,
  del_reservation,
  get_reservation,
} = require("../controllers/reservation");

const router = express.Router();

// /api/v1/reply
router.route("/").post(auth, reservation);
router.route("/get_movie").get(get_reservation);
router.route("/del_reservation").delete(auth, del_reservation);
module.exports = router;
