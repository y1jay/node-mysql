const request = require('postman-request');
const connection = require('./mysql_connection.js')

const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDdgxWR7TFIQ7i_lm_LhwgUrIl-iJ5B4v0&maxResults=19&q=킹크랩'



let encodedUrl = encodeURI(url)

request.get({url : encodedUrl, json:true},(error,response,body)=>{
    let insert_query = `insert into mytube (video_id,title,channel_title,thumbnail_url) values`
   let youArray = body.items
//    console.log(youArray)
   
   for(let i = 0; i < youArray.length; i++){
       let items = youArray[i]
    

       let video_id = items.id.videoId
       let title = items.snippet.title
       let channel_title = items.snippet.channelTitle
       let thumbnail_url = items.snippet.thumbnails.high.url
   
       // console.log(video_id,title,channel_title,thumbnail_url)

       insert_query = insert_query+`("${video_id}","${title}","${channel_title}","${thumbnail_url}"),`
    }

    insert_query = insert_query.slice(0,-1)
    connection.query(insert_query,(error,res,field)=>{
        console.log(res)
        //  console.log(insert_query)
    })

    connection.end()
   
})


