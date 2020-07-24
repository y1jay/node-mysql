const express = require("express");
const router = express.Router();

const {
  getMovies,
  searchMovie,
  descMovie,
  People,
} = require("../controllers/movies");

router.route("/").get(getMovies);
router.route("/search").post(searchMovie);
router.route("/desc").get(descMovie);
router.route("/people").get(People);
module.exports = router;
