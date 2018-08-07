const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Mongo connection
const db = mongojs(process.env.MONGODB_URI, ["houses"]);

db.on("error", error => {
  console.log("Database Error: ", error);
});

// Routes
app.post("/api/add", (req, res) => {
  db.houses.find({house: req.body.house}, (err, results) => {
    if(err) throw err;
    let currentPoints = parseInt(results[0].points);
    let revisedPoints = currentPoints + 1;
    db.houses.update({house: req.body.house}, {$set: {points: revisedPoints}}, () => {
      res.status(200).end();
    });
  });
});

app.post("/api/subtract", (req, res) => {
  db.houses.find({house: req.body.house}, (err, results) => {
    if(err) throw err;
    let currentPoints = parseInt(results[0].points);
    let revisedPoints = currentPoints - 1;
    db.houses.update({house: req.body.house}, {$set: {points: revisedPoints}}, () => {
      res.status(200).end();
    });
  });
});

app.get("/api/get", (req, res) => {
  db.houses.find({}, (err, results) => {
    if(err) throw err;
    res.send(results).end();
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
