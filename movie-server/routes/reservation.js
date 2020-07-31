const express = require("express");
const auth = require("../middleware/auth");
const {
  reservation,
  del_reservation,
  get_reservation,
  getMyReservations,
} = require("../controllers/reservation");

const router = express.Router();

// /api/v1/reply
router.route("/").post(auth, reservation);
router.route("/get_movie").get(get_reservation);
router.route("/:reservation_id").delete(auth, del_reservation);
router.route("/my").get(auth, getMyReservations);

module.exports = router;
