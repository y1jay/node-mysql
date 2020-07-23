const connection = require("../db/mysql_connection");
// json web token
const jwt = require("jsonwebtoken");
// validator
const validator = require("validator");
// bcrypt
const bcrypt = require("bcrypt");

// @desc     회원가입
// @route    POST /api/v1/users
// @parameters  email, passwd
exports.createUser = async (req, res, next) => {
  // 클라이언트로부터 이메일, 비번 받아서 변수로 만들자
  let email = req.body.email;
  let passwd = req.body.passwd;

  if (!validator.isEmail(email) == false) {
    res.status(400).json({ success: false });
    return;
  }

  const hashedPasswd = await bcrypt.hash(passwd, 8);

  let query = `insert into memo_user (email,passwd) values("${email}","${hashedPasswd}")`;
  let user_id;
  try {
    [result] = await connection.query(query);
    user_id = result.insertId;
  } catch (e) {
    res.status(500).json({ success: false });
    return;
  }

  const token = jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET);

  query = `insert into memo_token (token, user_id) values("${token}",${user_id})`;
  try {
    [result] = await connection.query(query);
  } catch (e) {
    res.status(500).json({ success: false });
    return;
  }

  res.status(200).json({ success: true, token: token });
};
