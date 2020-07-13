const connection = require('./mysql_connection.js')

let query = 'select * from memo'
connection.query(query,(error,res,field)=>{
    console.log(res)
})

query = 'select first_name, title, grade from students as s join papers as p on s.id = p.student_id order by grade desc limit 5'

connection.query(query,(error,res,field)=>{
    console.log(res)
})

query = 'select st.first_name, pa.title,pa.grade from students as st left join papers as pa on st.id = pa.student_id order by st.id asc'

connection.query(query,(error,res,field)=>{
    console.log(res)
})

query = ' select st.first_name, ifnull(pa.title,"MISSING")as title,ifnull(pa.grade,"0")as grade from students as st left join papers as pa  on st.id = pa.student_id order by st.id asc;'

connection.query(query,(error,res,field)=>{
    console.log(res)
})
query = 'select st.first_name, avg(ifnull(pa.grade,0)) as average from students as st left join papers as pa on st.id = pa.student_id group by st.first_name order by average desc, first_name desc;'

connection.query(query,(error,res,field)=>{
    console.log(res)
})
query = 'select st.first_name, avg(ifnull(pa.grade,0)) as average, if(pa.grade >=80,"PASSING","FALLING") as passing_status from students as st left join papers as pa on st.id = pa.student_id group by st.first_name order by average desc, first_name desc;'

connection.query(query,(error,res,field)=>{
        console.log(res)

    })
connection.end()


