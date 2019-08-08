const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 3000;

if (process.env.ENV === "Test") {
  console.log("This is a test");
  const db = mongoose.connect("mongodb://localhost/bookAPI_Test");
} else {
  console.log("This is not a test");
  const db = mongoose.connect("mongodb://localhost/bookAPI");
}

const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);
//const authorRouter = require('./routes/authorRouter')(Author);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello and  Welcome to my API !!!!");
});

app.server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
