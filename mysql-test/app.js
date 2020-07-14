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

// 2020-07-14 리뷰어

query = 'select s.title, r.rating from Series as s join Reviews as r on s.id = r.series_id'  

connection.query(query,(error,res,field)=>{
    console.log(res)

})


query =  'select s.title,round(avg( r.rating),5)  as avg from Series as s join Reviews as r on s.id = r.series_id group by s.title order by avg asc'

connection.query(query,(error,res,field)=>{
    console.log(res)

})  

query = 'select rs.first_name,rs.last_name, r.rating from Reviewers as rs join Reviews as r on rs.id = r.reviewer_id '

connection.query(query,(error,res,field)=>{
    console.log(res)

})  

query =' select s.title as unreviewed_series from Series as s left join Reviews as r on s.id = r.series_id where r.rating is null;'

connection.query(query,(error,res,field)=>{
    console.log(res)
})

query = ' select s.genre,avg(r.rating) from Series as s join Reviews as r on s.id = r.series_id group by s.genre order by s.genre '
connection.query(query,(error,res,field)=>{
    console.log(res)
})

query = ' select rw.first_name,rw.last_name,count(r.rating) as count,ifnull(min(r.rating),0)as min ,ifnull(max(r.rating),0)as max,ifnull(round(avg(r.rating),2),0) as avg, case when r.rating >0 then "ACTIVE" else"INACTIVE" end as status from Reviewers as rw left join Reviews as r on rw.id=r.reviewer_id group by rw.id order by count desc;'

connection.query(query,(error,res,field)=>{
    console.log(res)
})

query = 'select s.title, r.rating,concat(rw.first_name," ",rw.last_name) as reviewer from Reviews as r join Reviewers as rw on rw.id = r.reviewer_id join Series as s on s.id = r.Series_id order by s.title asc;'

connection.query(query,(error,res,field)=>{
    console.log(res)
})


connection.end()


