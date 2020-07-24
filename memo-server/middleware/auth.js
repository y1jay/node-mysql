// 클라이먼트의 헤더에 셋팅된
// Authorization 값 (Token)
// 인증한다.

const jwt = require("jsonwebtoken");
const connection = require("../db/mysql_connection");

const auth = async (req, res, next) => {
  let token;
  try {
    token = req.header("Authorization").replace("Bearer ", ""); //Bearer제거
  } catch (e) {
    res.status(401).json({ error: "인증하셈" });
    return;
  }

  // 유저 아이디와 토큰으로, db에 저장되어 있는 유효한 유저인지 체크.(한번에 하는 방법)
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // jwt.sign 할 떄 사용한 json 키 값을, 여기서 빼온다. => decoded.user_id
  let user_id = decoded.user_id;

  let query = `select mu.id, mu.email, mu.created_at from memo_token as mt
  join memo_user as mu 
  on mt.user_id = mu.id where mt.user_id = ${user_id} and mt.token = "${token}"`;
  try {
    [rows] = await connection.query(query);
    if (rows.length == 0) {
      res.status(401).json({ error: e });
    } else {
      req.user = rows[0]; // req의 유저 정보다
      next();
    }
  } catch (e) {
    res.status(401).json({ error: "인증하세염" });
  }
};
module.exports = auth;
