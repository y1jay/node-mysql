const express = require("express");
const auth = require("../middleware/auth");
const { favorite_movie, my_movie, del } = require("../controllers/favorite");

const router = express.Router();

// /api/v1/favorites
router.route("/").post(auth, favorite_movie);
router.route("/myfavorite").get(auth, my_movie);
router.route("/del").delete(auth, del);
module.exports = router;
