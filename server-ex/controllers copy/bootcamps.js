const connection = require("../db/mysql_connection");
const ErrorResponse = require("../utils/errorResponse");
// @desc    모든 정보를 다 조회
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const [rows, fields] = await connection.query(`select * from bootcamp`);
    res.status(200).json({ succese: true, items: rows });
  } catch (e) {
    next(new ErrorResponse("데헷 안됐지롱", 418));
  }
};

// @desc    해당 id의 정보 조회
// @route   GET /api/v1/bootcamps/id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    [rows, fields] = await connection.query(
      `select * from bootcamp where id = ${req.params.id}`
    );
    if (rows.length != 0) {
      res.status(200).json({ succese: true, items: rows[0] });
    } else {
      return next(new ErrorResponse("데헷 안됐지롱", 418));
    }
  } catch (e) {
    next(new ErrorResponse("안되지롱", 500));
  }
};

// @desc    새로운 정보를 insert
// @route   POST /api/v1/bootcamps/
// @access  Public

exports.createBootcamp = async (req, res, next) => {
  let title = req.body.title;
  let subject = req.body.subject;
  let teacher = req.body.teacher;
  let start_time = req.body.start_time;

  try {
    [rows, fields] = await connection.query(
      `insert into bootcamp (title,subject,teacher,start_time) values ("${title}","${subject}","${teacher}","${start_time}")`
    );
    res.status(200).json({ succese: true, items: rows[0] });
  } catch (e) {
    next(new ErrorResponse("데헷 안됐지롱", 418));
  }
};

// @desc    기존id에 있는 정보를 업데이트
// @route   PUT /api/v1/bootcamps/id
// @access  Public

exports.updateBootcamp = async (req, res, next) => {
  let id = req.params.id;
  let title = req.body.title;
  let subject = req.body.subject;
  let teacher = req.body.teacher;
  let start_time = req.body.start_time;
  let query = `update bootcamp set 
  title = "${title}",
  subject ="${subject}",
  teacher = "${teacher}",
  start_time = "${start_time}"
   where id = ${id}`;
  try {
    [rows, fields] = await connection.query(query);
    res.status(200).json({ succese: true, items: rows });
  } catch (e) {
    next(new ErrorResponse("데헷 안됐지롱", 418));
  }
};

// @desc    기존id에 있는 정보를 삭제
// @route   DELETE /api/v1/bootcamps/id
// @access  Public

exports.delelteBootcamp = async (req, res, next) => {
  let id = req.params.id;
  let query = `delete from bootcamp where id = ${id}`;
  try {
    [result] = await connection.query(query);
    if (result.affectedRows == 1) {
      res.status(200).json({ succese: true });
    } else {
      return next(new ErrorResponse("데헷 안됐지롱", 418));
    }
  } catch (e) {
    next(new ErrorResponse("뷰힛 안되지롱", 500));
  }
};

// exports == 함수별로 exports한것이다 (공유)
