const connection = require("../db/mysql_connection");
const moment = require("moment");
// @desc   좌석예약 // 여러자리를 한번에 예약하는 방법
// @route  POST/api/v1/reservation
// @request movie_id, seat_num_arr[], start_time, user_id(auth)
exports.reservation = async (req, res, next) => {
  let user_id = req.user.id;
  let seat_num_arr = req.body.seat_num_arr;
  let movie_id = req.body.movie_id;
  let start_time = req.body.start_time;

  if (!movie_id || !seat_num_arr || !start_time || !user_id) {
    res.status(400).json();
    return;
  }
  // 첫번째 방법 : select 해서, 해당 좌석 정보가 있는지 확인 => result.length == 1
  // 두번째 방법 : 테이블에, movie_id, start_time, seat_num 를 unique 하게 설정.
  let query = `insert into reservation(movie_id,seat_num,user_id,start_time) values ?`;
  let data = [];
  for (let i = 0; i < seat_num_arr.length; i++) {
    data.push([movie_id, seat_num_arr[i], user_id, start_time]);
  }

  try {
    [result] = await connection.query(query, [data]);
    res.status(200).json({ success: true, 좌석: seat_num_arr });
  } catch (e) {
    if (e.errno == 1062) {
      res.status(400).json({ message: "이미 예약된 좌석입니다" });
    }
  }
};

// @desc   상영시간의 해당영화 좌석 정보 불러오기(모든 좌석 정보)
// @route  GET/api/v1/reservation/get_movie
// @request  start_time, movie_id
// @response  success, items[], cnt

exports.get_reservation = async (req, res, next) => {
  let movie_id = req.query.movie_id;
  let start_time = req.query.start_time;
  if (!start_time || !movie_id) {
    res.json(400).json();
  }

  let query = `select id, movie_id,seat_num from reservation where start_time = "${start_time}"
  and movie_id = ${movie_id}`;

  try {
    [rows] = await connection.query(query);
    res.status(200).json({
      success: true,
      rows: rows,
      cnt: rows.length,
    });
    return;
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// @ desc      내가 예약한 좌석 정보 불러오기
// @ route     GET/api/v1/reservation/my
// @ request   user_id(auth)
// @ response  success, items[], cnt

exports.getMyReservations = async (req, res, next) => {
  let user_id = req.user.id;

  if (!user_id) {
    res.status(400).json();
    return;
  }
  // 지금 현재 시간보다, 상영시간이 지난 시간의 예약은,
  // 가져 올 필요가 없습니다.
  // 현재 시간을, 밀리세컨즈 1970년 1월1일이후의 시간 => 숫자 1596164845211
  let currentTime = Date.now();
  // 위의 현재 시간 숫자를 => 2020-07-31 12:07:25 식으로 바꿔준것.
  let compareTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");

  let query = `select * from reservation where user_id = ${user_id} and start_time > "${compareTime}"`;

  try {
    [rows] = await connection.query(query);

    res.status(200).json({ success: true, rows, rows, cnt: rows.length });
    return;
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};

// @ desc    좌석 예약을 취소
// @ route   DELETE /api/v1/reservation/del_reservation
// @ request user_id(auth)
// @ response  success
exports.del_reservation = async (req, res, next) => {
  let reservation_id = req.params.reservation_id;

  let currentTime = Date.now(); // 밀리세컨즈 1000 = 1초
  let compareTime = currentTime + 1000 * 60 * 30;

  let query = `select * from reservation where id = ${reservation_id}`;

  try {
    [rows] = await connection.query(query);
    // DB에 저장된 timestamp 형식을 =>밀리세컨즈로 바꾸는 방법
    let start_time = rows[0].start_time;
    let mili_start_time = new Date(start_time).getTime();
    if (mili_start_time < compareTime) {
      res
        .status(400)
        .json({ message: "영화시작 30분 이전에는 취소가 안됩니다." });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "안댐" });
  }

  query = `delete from reservation where id = ${reservation_id}`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ success: true });
    return;
  } catch (e) {
    res.status(500).json();
  }
};
