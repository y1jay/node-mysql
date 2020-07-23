// express : 웹 서버를 동작시키는 프레임워크

// npm 패키지 설치한 것들에 대한 require
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// 미들웨어에 대한 require
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");

//우리가 만든 라우터 파일 가져온다.
// router에 대한 require
const bootcamps = require("./routes/bootcamps");
const users = require("./routes/users");
// 환경 설정 파일의 내용을 로딩한다. .env파일
dotenv.config({ path: "./config/config.env" });

// 웹서버 프레임워크인 익스프레스를 가져온다.
const app = express();
app.use(express.json());
app.use(morgan("combined"));
//줄줄이 연결하는 법
// app.use(function (req, res, next) {
//   res.status(503).send("사이트가 불법이라 잡혀갔습니다 그럼 20000");
// });

// 로그 찍는, 로거함수 만든다.
//app.use 는 순서가 중요!! 순서대로 실행을 시킵니다. next()로
//함수 연결하는법, 미들웨어 연결
//라우터 연결  : url의 path와 라우터 파일과 연결 중요!!!
app.use("/api/v1/bootcamps", bootcamps);
//라우터 연결 :url의 path와 라우터user연결
app.use("/api/v1/users", users);
// 위의 에러를 처리하기 위해서, 에러 핸들러 연결
app.use(errorHandler);

// 환경설정 파일인, config.env파일에 있는 내용을 불러오는 방법.(||5000 안써도 되나 안전빵으로 쓰면 좋음)
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}mode on port ${PORT}`)
);

// var jwt = require("jsonwebtoken");

// sign()함수를 이용하면 토큰을 만들어준다 {} 뒤에 ""값은 시드나 솔트라고 한다
// 절대 해킹을 못하게 하겠다. 시드 부분엔 마음대로 문자열을 넣는다.시드값은 노출되면 안된다
// var token = jwt.sign({ _id: 1 }, process.env.ACCESS_TOKEN_SECRET);
// console.log(token);
// console.log(process.env.ACCESS_TOKEN_SECRET);

// const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
// console.log(data);
