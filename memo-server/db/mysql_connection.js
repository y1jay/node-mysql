const mysql = require("mysql");
const db_config = require("../config/db-config.json");
// 환경설정 파일 로딩
const connection = mysql.createConnection({
  host: db_config.MYSQL_HOST,
  user: db_config.MYSQL_USER,
  database: db_config.DB_NAME,
  password: db_config.DB_PASSWD,
});
//다른애들이 이 connection을 가져다 쓸 수있다.
module.exports = connection;
