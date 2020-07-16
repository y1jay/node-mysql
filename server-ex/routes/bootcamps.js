const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  delelteBootcamp,
} = require("../controllers/bootcamps");

const router = express.Router();

// 각 경로별로 데이터 가져올 수 있도록, router 셋팅 아래가 라우터 설정
// 원하는 경로에 api를 만들어 주는 것
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(delelteBootcamp);
module.exports = router;
// 너무 많고 복잡해서 폴더로 분리한다.
