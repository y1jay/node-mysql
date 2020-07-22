const connection = require("../db/mysql_connection");
const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc    회원가입
// @route   POST /api/v1/users
// @route   POST /api/v1/users/register
// @route   POST /api/v1/users/signup
// @parameters  email, passwd
exports.createUser = async (req, res, next) => {
  let email = req.body.email;
  let passwd = req.body.passwd;

  // 패스워드를 암호화 해서 넣어야 한다
  // 비밀번호와 같은 것은, 단방향 암호화를 해야 한다.
  // 그래야, 복호화가 안되어서, 안전하다.(복호화는 암호화한걸 원상태로 돌리는것)
  // 1234(원문) => ****
  // **** => 1234(원문)
  // (passwd를 바꾼다 , 8이 가장 빠르다 )
  const hashedPasswd = await bcrypt.hash(passwd, 8);

  // 이메일이 정상적인지 체크
  if (!validator.isEmail(email)) {
    res.status(500).json({ success: false });
    return;
  }

  // 패스워드가 문자랑 숫자로만 되어있냐?
  let query = `insert into user(email,passwd) values ("${email}","${hashedPasswd}")`;
  let user_id;
  try {
    [result] = await connection.query(query);
    user_id = result.insertId;
    // res.status(200).json({ succese: true, result: result });
  } catch (e) {
    if (e.errno == 1062) {
      // 이메일 중복된 것이다.
      res.status(401).json({ succese: false, errno: 1 });
      return;
    } else {
      res.status(500).json({ error: e });
      return;
    }
  }
  let token = jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET);
  query = `insert into token (token,user_id) values("${token}",${user_id})`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
    return;
  } catch (e) {
    res.status(400).json({ succese: false, result: result });
  }
};

// 로그인 api를 개발하세요

// @desc   로그인
// @route   POST /api/v1/users/login
// @paramaeters  email, passwd
// async 는 동시에 처리할 수 있게해라
exports.LoginUser = async (req, res, next) => {
  let email = req.body.email;
  let passwd = req.body.passwd;

  let query = `select * from user where email ="${email}"`;

  try {
    [rows] = await connection.query(query);

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
    query = `insert into token (token,user_id) values(?,?)`;

    let data = [token, rows[0].id];
    try {
      [result] = await connection.query(query, data);
      res.status(200).json({ succese: true, result: isMatch, token: token });
      return;
    } catch {
      res.status(500).json({ error: e });
      return;
    }
  } catch {
    res.status(500).json({ error: e });
  }
};

// 패스워드 변경 API를 설계/개발하시오

// @desc   패스워드 변경
// @route   PUT /api/v1/users/change
// @parameters  email passwd

exports.updatePasswd = async (req, res, next) => {
  let email = req.body.email;
  let passwd = req.body.passwd;
  let new_passwd = req.body.new_passwd;
  const hashedPasswd = await bcrypt.hash(new_passwd, 8);

  //이 유저가, 맞는 유저인지 체크
  let query = `select passwd from user where email = "${email}"`;
  try {
    [rows] = await connection.query(query);
    let savedPasswd = rows[0].passwd;
    let isMatch = await bcrypt.compare(passwd, savedPasswd);

    if (isMatch != true) {
      res.status(401).json({ succese: false, result: isMatch });
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
  query = `update user set passwd ="${hashedPasswd}" where email = "${email}"`;
  try {
    [result] = await connection.query(query);
    if (result.affectedRows == 1) {
      res.status(200).json({ succese: true });
      return;
    } else {
      res.status(200).json({ succese: false });
      return;
    }
  } catch (e) {
    res.status(500).json({ succese: false, error: e });
  }
};

// 유저의 id값으로 내정보를 가져오는 API 개발

// @desc     내정보 가져오기
// @route    GET/api/v1/users/:id

exports.getMyInfo = async (req, res, next) => {
  let id = req.params.id;

  let query = `select * from user where id =${id}`;

  try {
    [rows] = await connection.query(query);
    if (rows.length != 1) {
      res.status(404).json({ succese: false });
    } else {
      //제이슨 객체에서,자바스크립트에서 내가 무언가를 빼고싶으면 delete 를 쓴다
      delete rows[0].passwd;
      res.status(200).json({ succese: true, result: rows[0] });
    }
  } catch (e) {
    res.status(500).json({ succese: false, error: e });
  }
};
