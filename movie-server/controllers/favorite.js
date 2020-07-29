const connection = require("../db/mysql_connection");

// @desc  좋아하는 영화 (즐겨찾기)API
// @route  POST /api/v1/favorite

exports.favorite_movie = async (req, res, next) => {
  let user_id = req.user.id;
  let movie_id = req.body.id;
  console.log(user_id);

  let query = `insert into favorite_movie(favorite_id,movie_id) values (${user_id},${movie_id})`;
  try {
    [result] = await connection.query(query);
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    if (e.errno == 1062) {
      res.status(500).json({ error: e });
    }
  }
};

// @desc  좋아하는 영화 (즐겨찾기 저장된 영화 가져오는 )API
// @route  GET /api/v1/favorite/my_movie

exports.my_movie = async (req, res, next) => {
  let user_id = req.user.id;
  let offset = req.query.offset;

  let query = `select * from movie_user as mu
   left join favorite_movie as f
    on mu.id = f.favorite_id 
     join movie as m on m.id = f.movie_id 
  where mu.id = ${user_id} limit ${offset},25`;

  try {
    [result] = await connection.query(query);
    delete result.passwd;
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    res.status(500).json({ succese: false, error: e });
  }
};

// @desc  즐겨찾기 삭제 API
// @route  DELETE /api/v1/users/del

exports.del = async (req, res, next) => {
  let user_id = req.user.id;

  let query = `delete from favorite_movie where favorite_id = ${user_id}`;

  try {
    [result] = await connection.query(query);
    delete result.passwd;
    res.status(200).json({ succese: true, result: result });
  } catch (e) {
    res.status(500).json({ succese: false, error: e });
  }
};
