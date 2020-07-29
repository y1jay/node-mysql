const connection = require("../db/mysql_connection");

// @desc  댓글 달기
// @route  POST/api/v1/reply
exports.comment = async (req, res, next) => {
  let user_id = req.user.id;
  let movie_id = req.body.id;
  let comment = req.body.comment;
  let star_point = req.body.star_point;
  let query = `insert into reply(movie_id,user_id,comment,star_point) 
  values (${movie_id},${user_id},"${comment}",${star_point})`;

  try {
    if (star_point > 5) {
      res.status(500).json({ message: "별점은 5점이 최대입니다." });
      return;
    }
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
};
// @desc  댓글 보긔
// @route  GET/api/v1/reply/ALLreply

exports.ALLreply = async (req, res, next) => {
  let offset = req.query.offset;
  let query = `select m.title, u.email, r.comment, r.star_point, r.created_at
    from reply as r join movie as m
    on r.movie_id = m.id 
    join movie_user as u on r.user_id = u.id
     limit ${offset}, 25`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// @desc  댓글 수정
// @route  PUT/api/v1/reply/update
exports.update_reply = async (req, res, next) => {
  let user_id = req.user.id;
  let movie_id = req.body.id;
  let comment = req.body.comment;
  let query = `update reply set comment = "${comment}" 
    where user_id = ${user_id} and movie_id = ${movie_id}`;
  try {
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// @desc  댓글 삭제
// @route  delete/api/v1/reply/delete
exports.delete_reply = async (req, res, next) => {
  let user_id = req.user.id;
  let movie_id = req.body.id;
  let query = `delete from reply where user_id = ${user_id} and movie_id = ${movie_id} `;
  try {
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
