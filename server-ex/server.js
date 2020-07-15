const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("뭘 봐");
});

app.listen(3000);
