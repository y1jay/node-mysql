const connection = require("../db/mysql_connection");
// const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../db/mysql_connection");
const sendEmail = require("../utils/sendmail");
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

    const messsage = "환영하지않지않지를않고않습니다.";
    try {
      await sendEmail({
        email: "tkdwls0712@naver.com",
        subject: "회원가입 축하",
        messsage: messsage,
      });
    } catch (e) {
      // 에러남
      res.status(418).json({ succese: false, result: result });
    }

    res.status(200).json({ succese: true, result: result });
    return;
  } catch (e) {
    res.status(500).json({ succese: false, result: result });
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
// @route    GET/api/v1/users/

exports.getMyInfo = async (req, res, next) => {
  // req.user는 auth에 담아뒀었다.
  res.status(200).json({ succese: true, result: req.user });
};

// @ desc   로그아웃 api: DB에서 해당 유저의 현재 토큰값을 삭제
// @ route  POST /api/v1/users/Logout
// @parameters  X

exports.Logout = async (req, res, next) => {
  // 토큰테이블에서, 현재 이 헤더에 있는 토큰으로, 삭제한다.
  let token = req.user.token;
  let user_id = req.user.id;
  let query = `delete from token where user_id = ${user_id} and token = "${token}"`;

  try {
    [result] = await connection.query(query);
    if (result.affectedRows == 1) {
      // result 를 res에 넣어서 클라이언트에 보낸다.
      // 포스트맨에서 삭제API 호출하여 무엇이 오는지 확인해본다.
      res.status(200).json({ succese: true, result: result });
      return;
    } else {
      res.status(400).json({ succese: false });
      return;
    }
  } catch (e) {
    res.status(500).json({ succese: false, error: e });
    return;
  }
};

// 안드로이드 사용하고, 아이폰도 사용하고, 집 컴도 사용.
// 이 서비스를 각각의 디바이스마다 다 로그인하여 사용중 이었다
// 전체 디바이스(기기) 전부 다 로그아웃을 시키게 하는 API

// @ desc   전체 기기에서 모두 로그아웃 하기
// @ route  POST /api/v1/users/LogoutALL

exports.LogoutAll = async (req, res, next) => {
  let user_id = req.user.id;

  let query = `delete from token where user_id = ${user_id} `;

  try {
    [result] = await connection.query(query);

    res.status(200).json({ succese: true, result: result });
    return;
  } catch (e) {
    res.status(500).json({ succese: false, error: e });
    return;
  }
};

// 회원탈퇴 : db에서 해당 회원의 유저 테이블 정보 삭제
// => 유저 정보가 있는 다른 테이블도 정보 삭제

// @ desc   회원탈퇴 : 유저 테이블에서 삭제, 토큰테이블에서 삭제
// @ route  DELETE  /api/v1/users

exports.dethUser = async (req, res, next) => {
  let user_id = req.user.id;
  let query = `delete from user where id = ${user_id}`;
  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();
    // 첫번째 테이블에서 정보 삭제
    [result] = await conn.query(query);
    // 두번째 테이블에서 정보 삭제
    query = `delete from token where user_id = ${user_id}`;
    [result] = await conn.query(query);

    await conn.commit();
    res.status(200).json({ success: true });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ success: false, error: e });
  } finally {
    conn.release();
  }
};
