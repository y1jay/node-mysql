const connection = require("../db/mysql_connection");
const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");
// @desc    회원가입
// @route   POST /api/v1/users
// @route   POST /api/v1/users/register
// @route   POST /api/v1/users/signup
// @parameters  email, passwd
exports.createUser = async (req, res, next) => {
  let email = req.body.email;
  let passwd = req.body.passwd;

  // 이메일이 정상적인지 체크
  if (!validator.isEmail(email)) {
    res.status(500).json({ success: false });
    return;
  }
  // 셀렉트 해봐서 이메일이 존재하면 1 보다 크니까 렝스로 크면 메세지로 보낸다
  let query = `select * from user where email = "${email}"`;
  try {
    [rows] = await connection.query(query);
    if (rows.length >= 1) {
      res
        .status(200)
        .json({ succese: false, code: 1, message: "이미 존재하는 이메일" });
      return;
    }
  } catch {
    res.status(500).json({ error: e });
    return;
  }
  // 패스워드가 문자랑 숫자로만 되어있냐?
  query = `insert into user(email,passwd) values ("${email}","${passwd}")`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
