const connection = require("../db/mysql_connection");
const ErrorResponse = require("../utils/errorResponse");
// 모든 주소록 데이터를 다 가져와서, 클라이언트한테 보내는것은
// 문제가 있습니다.
// 현업에서는 20~30개 사이로 끊어서 보냅니다.

// @desc    모든 정보를 다 조회
// @route   GET /api/v1/contact?offset=0limit=20
// @access  Public
exports.getcontacts = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  try {
    const [rows, fields] = await connection.query(
      `select * from contact limit ${offset},${limit}`
    );
    let count = rows.length;
    res.status(200).json({ succese: true, items: rows, count: count });
  } catch (e) {
    next(new ErrorResponse("에러 발생", 418));
  }
};

// @desc    해당 id의 정보 조회
// @route   GET /api/v1/contact/id
// @access  Public
// exports.getcontact = async (req, res, next) => {
//   try {
//     [rows, fields] = await connection.query(
//       `select * from contact where id  ${req.query.id}`
//     );
//     if (rows.length != 0) {
//       res.status(200).json({ succese: true, items: rows[0] });
//     } else {
//       return next(new ErrorResponse("에러 발생", 418));
//     }
//   } catch (e) {
//     next(new ErrorResponse("에러 발생", 500));
//   }
// };

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

    res.status(200).json({ succese: true, items: rows });
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
  let id = req.query.id;
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

// @desc 이름이나, 전화번호로 검색한API
// @route GET/api/v1/contact/search?/ketword=67
exports.searchcontact = async (req, res, next) => {
  let keyword = req.query.keyword;
  console.log(keyword);
  let query = `select * from contact where name like "%${keyword}%" or phon_number like "%${keyword}%"`;
  try {
    [rows, fields] = await connection.query(query);
    res.status(200).json({ succese: true, items: rows });
  } catch (e) {
    res.status(500).json({
      succese: false,
      message: "DB ERROR",
      error: e,
    });
  }
};
