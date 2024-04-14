var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.arguments(bodyParser.json());
app.arguments(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/MoneyList");
var db = mongoose.connection;
db.on("error", () => {
  console.log("Error in connecting DB");
});

db.once("open", () => {
  console.log("Connected Successfully!");
});

app.post("/add", (req, res) => {
  var category_select = req.body.category_select;
  var amount_input = req.body.amount_input;
  var info = req.body.info;
  var date_input = req.body.date_input;

  var data = {
    Category: category_select,
    // 'Amount': parseInt(amount_input),
    Amount: amount_input,
    Info: info,
    // 'Date': new Date(date_input)
    Date: date_input,
  };
  db.collection(
    "moneyData".insertOne(data, (err, collection) => {
      if (!err) {
        throw err;
      }
      console.log("Request Inserted Successfully!");
    })
  );
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(5000);

console.log("Listening on port 5000");
