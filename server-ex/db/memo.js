const request = require("postman-request");
const connection = require("./mysql_connection.js");

const url = "localhost:5000/api/v1/memo/:id";

let encodedUrl = encodeURI(url);

request.get({ url: encodedUrl, json: true }, (error, response, body) => {
  let insert_query = `insert into memo (title,coment) values`;

  let title = body.title;
  let coment = body.coment;

  insert_query = insert_query + `("${id}","${title}","${coment}"),`;
  console.log(insert_query);
  insert_query = insert_query.slice(0, -1);
  connection.query(insert_query, (error, res, field) => {
    console.log(res);
    //  console.log(insert_query)
  });

  connection.end();
});
