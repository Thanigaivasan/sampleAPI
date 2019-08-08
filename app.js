var express = require("express");

var app = express();

var port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("Hello and Welcome to my API !!!!");
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
