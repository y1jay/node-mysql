const request = require('postman-request');

const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/화곡역.json?access_token=pk.eyJ1IjoieTFqdW4iLCJhIjoiY2tjbXh3emVlMDV4YTJzbW96eW4zMXlhYyJ9.FRqU7uCfiPKN7-L-OiHG9A'

//화곡역의 위도 경도를 뽑아서 출력
// 한글을 허용하는 코드 encodedUrl = encodeURI(url)
let encodedUrl = encodeURI(url)
//.geometry.coordinates[0]
request.get({url : encodedUrl, json:true},(error,response,body)=>{
let place = body.features[0].center[1]
let place2 = body.features[0].center[0]
console.log(place)
console.log(place2)
})

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });