const connection = require("../db/mysql_connection");

// @desc   좌석예약
// @route  POST/api/v1/reservation

exports.reservation = async (req, res, next) => {
  let user_id = req.user.id;
  let seat_num = req.body.seat_num;
  let movie_id = req.body.movie_id;
  let start_time = req.body.start_time;
  let query = `insert into reservation(movie_id,seat_num,user_id,start_time) values (${movie_id},
    "${seat_num}",${user_id},"${start_time}")`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ success: true, 좌석: seat_num });
  } catch (e) {
    if (e.errno == 1062) {
      res.status(500).json({ message: "이미 예약된 좌석입니다" });
    }
  }
};

// @desc   영화,시간별 좌석정보 불러오기
// @route  GET/api/v1/reservation/get_movie

exports.get_reservation = async (req, res, next) => {
  let title = req.body.title;
  let start_time = req.body.start_time;
  let query = `select m.title,r.start_time ,r.seat_num from movie as m
join reservation as r on m.id = r.movie_id where title like "%${title}%" and 
start_time like "%${start_time}%"`;

  try {
    [rows] = await connection.query(query);
    res.status(200).json({
      success: true,
      rows: rows,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// @ desc   예약취소하기
// @ route   DELETE /api/v1/reservation/del_reservation

exports.del_reservation = async (req, res, next) => {
  let title = req.body.title;
  let user_id = req.user.id;
  let query = `select m.title,r.start_time ,r.seat_num from movie as m
join reservation as r on m.id = r.movie_id where user_id = ${user_id}
 title like "%${title}%"`;

  try {
    [rows] = await connection.query(query);

    let start_time = rows[0].start_time;
    console.log(start_time);
    try {
      if (start_time < now(30)) {
        res
          .status(400)
          .json({ message: "영화시작 30분 전에는 취소가 불가능 합니다" });
      } else {
        query = `delete from reservation where user_id = ${user_id} and title = ${title}`;
        [result] = await connection.query(query);
        res.status(200).json({ success: true });
      }
    } catch (e) {
      res.status(401).json({ error: e });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
