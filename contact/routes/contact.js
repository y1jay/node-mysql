const express = require("express");
const {
  getcontacts,

  createcontact,
  updatecontact,
  deleltecontact,
  searchcontact,
} = require("../controllers/contact");

const router = express.Router();

// 각 경로별로 데이터 가져올 수 있도록, router 셋팅 아래가 라우터 설정
// 원하는 경로에 api를 만들어 주는 것
router.route("/").post(createcontact).get(getcontacts);
router.route("/:id").put(updatecontact).delete(deleltecontact);
router.route("/search").get(searchcontact);

module.exports = router;
// 너무 많고 복잡해서 폴더로 분리한다.
