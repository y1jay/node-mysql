const connection = require("../db/mysql_connection");
const ErrorResponse = require("../utils/errorResponse");
// @desc    모든 정보를 다 조회
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getcontacts = async (req, res, next) => {
  try {
    const [rows, fields] = await connection.query(`select * from contact`);
    res.status(400).json({ succese: true, items: rows });
  } catch (e) {
    next(new ErrorResponse("에러 발생", 418));
  }
};

// @desc    해당 id의 정보 조회
// @route   GET /api/v1/contact/id
// @access  Public
exports.getcontact = async (req, res, next) => {
  try {
    [rows, fields] = await connection.query(
      `select * from contact where id = ${req.params.id}`
    );
    if (rows.length != 0) {
      res.status(200).json({ succese: true, items: rows[0] });
    } else {
      return next(new ErrorResponse("에러 발생", 418));
    }
  } catch (e) {
    next(new ErrorResponse("에러 발생", 500));
  }
};

// @desc    새로운 정보를 insert
// @route   POST /api/v1/contact/
// @access  Public

exports.createcontact = async (req, res, next) => {
  let name = req.body.name;
  let phon_number = req.body.phon_number;
  let memo = req.body.memo;

  try {
    [rows, fields] = await connection.query(
      `insert into contact (name,phon_number,memo) values ("${name}","${phon_number}","${memo}")`
    );
    res.status(200).json({ succese: true, items: rows[0] });
  } catch (e) {
    next(new ErrorResponse("데헷 안됐지롱", 418));
  }
};

// @desc    기존id에 있는 정보를 업데이트
// @route   PUT /api/v1/contact/id
// @access  Public

exports.updatecontact = async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  let phon_number = req.body.phon_number;
  let memo = req.body.memo;
  let query = `update contact set 
  name = "${name}",
  phon_number ="${phon_number}",
  memo = "${memo}"
   where id = ${id}`;
  try {
    [rows, fields] = await connection.query(query);
    res.status(200).json({ succese: true, items: rows });
  } catch (e) {
    next(new ErrorResponse("안됐지롱", 418));
  }
};

// @desc    기존id에 있는 정보를 삭제
// @route   DELETE /api/v1/contact/id
// @access  Public

exports.deleltecontact = async (req, res, next) => {
  let id = req.params.id;
  let query = `delete from contact where id = ${id}`;
  try {
    [result] = await connection.query(query);
    if (result.affectedRows == 1) {
      res.status(200).json({ succese: true });
    } else {
      return next(new ErrorResponse("안됐지롱", 418));
    }
  } catch (e) {
    next(new ErrorResponse(" 안되지롱", 500));
  }
};

// exports == 함수별로 exports한것이다 (공유)
