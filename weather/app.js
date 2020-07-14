const request = require('postman-request');

const baseUrl ='http://api.weatherstack.com/'

let queryUrl = baseUrl+'current?access_key=011a6ca0a436cb6ed6d3c3abeca16a8b'+
'&query='

let query = 'Seoul'

request({url : queryUrl + query, json:true},(error,response,body)=>{
    console.log(response.statusCode)
    // console.log(body)
    console.log(body.current.temperature)
})


