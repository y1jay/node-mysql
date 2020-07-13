
const mysql = require('mysql')

const connection = mysql.createConnection(
    {
        host : 'database-1.ckd17nv1s0bt.ap-northeast-2.rds.amazonaws.com',
        user : 'node_user',
        database : 'my_test',
        password : 'lhj0531'
} 
)
//다른애들이 이 connection을 가져다 쓸 수있다.
module.exports = connection
// connection.connect()
// connection.end()
