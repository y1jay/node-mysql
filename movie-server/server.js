const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
// 파일 처리를 위한 라이브러리 임포트
const fileupload = require("express-fileupload");
const path = require("path");

const movies = require("./routes/movies");
const users = require("./routes/users");
const favorite = require("./routes/favorite");
const reply = require("./routes/reply");
const reservation = require("./routes/reservation");
// 환경설정 파일 로딩

const app = express();
// post 사용시, body 부분을 json 으로 사용하겠따.
app.use(express.json());
// 사진 업로드하는 npm
app.use(fileupload());
// 이미지를 불러올 수 있도록 static 경로 설정 __dirname 은 node의 함수 지금 돌아가는 서버의 이름
// 웹브라우저가 불러올 수 있게 해주겠다.
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/movies", movies);
app.use("/api/v1/users", users);
app.use("/api/v1/favorite", favorite);
app.use("/api/v1/reply", reply);
app.use("/api/v1/reservation", reservation);
const PORT = process.env.PORT || 5900;

app.listen(PORT, console.log(`Server running in  port 5900`));
