const express = require("express");
const dotenv = require("dotenv");

const movies = require("./routes/movies");
const users = require("./routes/users");
const favorite = require("./routes/favorite");
const reply = require("./routes/reply");
const reservation = require("./routes/reservation");
// 환경설정 파일 로딩
dotenv.config({ path: "./config/config.env" });

const app = express();
// post 사용시, body 부분을 json 으로 사용하겠따.
app.use(express.json());

app.use("/api/v1/movies", movies);
app.use("/api/v1/users", users);
app.use("/api/v1/favorite", favorite);
app.use("/api/v1/reply", reply);
app.use("/api/v1/reservation", reservation);
const PORT = process.env.PORT || 5900;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV}mode on port ${PORT}`)
);
