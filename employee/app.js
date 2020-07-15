const request = require('postman-request');


const baseUrl ='http://dummy.restapiexample.com'

let query = '/api/v1/employees'


const connection = require('./mysql_connection.js')


// let query = 'insert into'
// connection.query(query,(error,res,field)=>{
//     console.log(res)
// })


request.get({url : baseUrl+query, json:true},(error,response,body)=>{
    let insert_query = `insert into employee values`
    let dataArray = body.data
    // console.log(body.data[0].employee_name)
   for(let i= 0; i< dataArray.length; i++){
    //    let data = dataArray[i]
    
    //    console.log(dataArray[i])
   let arr = dataArray[i]

   let id = arr.id
   let name = arr.employee_name
   let age = arr.employee_age
   let salary = arr.employee_salary
   
//    console.log(new_data)
   insert_query = insert_query+`(${id},"${name}",${age},${salary}),`
   }
   insert_query = insert_query.slice(0,-1)
//    console.log(insert_query.slice(0,-1))

    connection.query(insert_query,(error,res,field)=>{
        console.log(res)
        // console.log(insert_query)
    })
    
    connection.end()
})

