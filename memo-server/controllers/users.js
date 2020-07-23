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

  if (validator.isEmail(email) == false) {
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

exports.Login_user = async (req, res, next)=>{
  console.log("로그인 ");
  let email = req.body.email;
  let passwd = req.body.passwd;

  let query = `select * from memo_user where email = "${email}"`;

  try {
    [rows] = await connection.query(query);

      if (rows.length ==0) {
        
        res
          .status(400)
          .json({ success: false, message: "등록되지 않은 이메일입니다" });
        return;
      }
    // 비밀번호 체크 : 비밀번호가 서로 맞는지 확인
    let savedPasswd = rows[0].passwd;

    const isMatch = await bcrypt.compare(passwd, savedPasswd);
    if (isMatch == false) {
      res.status(400).json({ succese: false, result: isMatch });
      return;
    }
    let token = jwt.sign(
      { user_id: rows[0].id },
      process.env.ACCESS_TOKEN_SECRET
    );
    query = `insert into memo_token (token,user_id) values("${token}",${rows[0].id})`;

    try {
      [result] = await connection.query(query);
      res.status(200).json({ succese: true, result: isMatch, token: token });
      
    } catch(e) {
      res.status(418).json({ error: e });
     
    }
  } catch (e){
    res.status(401).json({ error: e });
  }

}