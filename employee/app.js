const request = require('postman-request');


const baseUrl ='http://dummy.restapiexample.com/api/v1/'

let query = 'employees'


const connection = require('./mysql_connection.js')


// let query = 'insert into'
// connection.query(query,(error,res,field)=>{
//     console.log(res)
// })


request.get({url : baseUrl+query, json:true},(error,response,body)=>{
    
    let dataArray = body.data
    // console.log(body.data[0].employee_name)
   for(let i= 0; i< dataArray.length; i++){
    //    let data = dataArray[i]
    
    //    console.log(dataArray[i])
   let data = dataArray[i]
   let id = data.id
   let name = data.employee_name
   let salary = data.employee_salary
   let age = data.employee_age

   let new_data = ('('+id+','+'"'+name+'"'+','+salary+','+age+','+'default'+')')
   console.log(new_data)

    let insert_query = 'insert into employee values'+new_data+';'
    connection.query(insert_query,(error,res,field)=>{
        console.log(res)
        // console.log(insert_query)
    })
    
}
})

connection.end()