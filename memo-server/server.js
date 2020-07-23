const express = require("express");
const dotenv = require("dotenv");
const memos = require("./routes/memos");

// 환경설정 파일 로딩
dotenv.config({ path: "./config/config.env" });

const app = express();
// post 사용시, body 부분을 json 으로 사용하겠따.
app.use(express.json());

app.use("/api/v1/memos", memos);


const PORT = process.env.PORT || 5100;

app.listen(PORT, console.log("App listening on port 5100!"));
