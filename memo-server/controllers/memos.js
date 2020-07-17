// 데이터베이스 연결
const connection = require("../db/mysql_connection");

// @desc    GET 모든 메모 가져오기
// @route   GET /api/v1/memos
exports.getMemos = (req, res, next) => {
  //1. 데이터베이스에 접속해서, 쿼리한다.
  //2. 그 결과를 res(respons)에 담아서 보내준다.
  let query = "select * from memo";

  connection.query(query, (error, result, field) => {
    console.log(error);
    res.status(200).json({
      success: true,
      result: {
        memos: result,
      },
    });
  });
};

// @desc    POST 메모 생성하기
// @route   POST /api/v1/memos
// @body    {title:"앤뉑", commnet:"좋누"}

exports.createMemo = (req, res, next) => {
  //     //1. 데이터베이스에 접속해서, 쿼리한다.
  //     //2. 그 결과를 res(respons)에 담아서 보내준다.
  let title = req.body.title;
  let coment = req.body.coment;
  let query = "insert into memo (title,coment) values (?,?)";
  connection.query(query, [title, coment], (error, result, field) => {
    console.log(result);
    res.status(200).json({ success: true, result: { memos: result } });
  });
};

// @desc    PUT 메모 수정하기
// @route   PUT /api/v1/memos/:id
// @body    {title:"앤뉑", commnet:"좋누"}
exports.updateMemo = (req, res, next) => {
  //     //1. 데이터베이스에 접속해서, 쿼리한다.
  //     //2. 그 결과를 res(respons)에 담아서 보내준다.
  let id = req.params.id;
  let title = req.body.title;
  let coment = req.body.coment;
  let query = `update memo set 
  title = "${title}",
  coment ="${coment}"
   where id = ${id}`;

  connection.query(query, (error, result, field) => {
    console.log(result);
    res.status(200).json({ success: true, result: { memos: result } });
    connection.end();
  });
};

// @desc    DELETE 메모 삭제하기
// @route   DELETE /api/v1/memos/:id
// @body    {title:"앤뉑", commnet:"좋누"}
exports.deleteMemo = (req, res, next) => {
  //     //1. 데이터베이스에 접속해서, 쿼리한다.
  //     //2. 그 결과를 res(respons)에 담아서 보내준다.
  let id = req.params.id;

  let query = `delete from memo
where id = ${id}`;

  connection.query(query, (error, result, field) => {
    console.log(result);
    res.status(200).json({ success: true });
    connection.end();
  });
};
