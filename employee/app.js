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

   let new_data = ('('+id+','+'"'+name+'"'+','+salary+','+age+')'+',')
   console.log(new_data)
   for(let i = 0; i<new_data.length; i++){
    let insert_query = 'insert into employee(id,emproyee_name,employee_age,employee_salaray,profile_image) values'+new_data +'default'+';'
    connection.query(insert_query,(error,res,field)=>{
        // console.log(res)
    })
    }
}
})

connection.end()