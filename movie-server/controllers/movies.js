const connection = require("../db/mysql_connection");

// @desc     영화데이터 불러오기
// @route    GET /api/v1/movies/
// @parameters   *
// @response  success : true , movie : rows
exports.getMovies = async (req, res, next) => {
  let offset = req.query.offset;

  try {
    const [rows, fields] = await connection.query(
      `select * from movie limit ${offset},25`
    );

    res.status(200).json({ succese: true, movie: rows });
    return;
  } catch (e) {
    res.status(404).json({ succese: false, message: "에러발생" });
    return;
  }
};

// @desc     영화명 검색해서 가져오기
// @route    POST /api/v1/movies/search
// @parameters  title
// @response  success, movie:rows
exports.searchMovie = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  let title = req.body.title;
  try {
    const [rows, fields] = await connection.query(
      `select * from movie where title like "%${title}%" limit ${offset},${limit}`
    );

    res.status(200).json({ succese: true, movie: rows });
    return;
  } catch (e) {
    res.status(404).json({ succese: false, message: "에러발생" });
    return;
  }
};

// @desc   연도 내림차순 정렬해서 가져오기
// @url    GET/api/v1/movies/desc
// @request  *
// @response success, movie:rows

exports.descMovie = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  try {
    const [rows, fields] = await connection.query(
      `select * from movie order by year desc limit ${offset},${limit}`
    );

    res.status(200).json({ succese: true, movie: rows });
    return;
  } catch (e) {
    res.status(404).json({ succese: false, message: "에러발생" });
    return;
  }
};

// @desc   관객수 내림차순 정렬해서 가져오기
// @url    GET/api/v1/movies/people
// @request  *
// @response success, movie:rows

exports.People = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  try {
    const [rows, fields] = await connection.query(
      `select * from movie order by attendance desc limit ${offset},${limit}`
    );

    res.status(200).json({ succese: true, movie: rows });
    return;
  } catch (e) {
    res.status(404).json({ succese: false, message: "에러발생" });
    return;
  }
};
