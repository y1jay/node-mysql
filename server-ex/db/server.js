// express : 웹 서버를 동작시키는 프레임워크
const express = require("express");
const dotenv = require("dotenv");

//우리가 만든 라우터 파일 가져온다.
const memo = require("./routes/memo");
// 환경 설정 파일의 내용을 로딩한다. .env파일
dotenv.config({ path: "./config/config.env" });

// 웹서버 프레임워크인 익스프레스를 가져온다.
const app = express();

//라우터 연결  : url의 path와 라우터 파일과 연결 중요!!!
app.use("/api/v1/memo", memo);

// 환경설정 파일인, config.env파일에 있는 내용을 불러오는 방법.(||5000 안써도 되나 안전빵으로 쓰면 좋음)
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}mode on port ${PORT}`)
);
