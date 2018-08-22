const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Mongo connection
const db = mongojs(process.env.MONGODB_URI, ["houses", "users", "log"]);

db.on("error", error => {
  console.log("Database Error: ", error);
});

// Mongo log function
const dbLog = (user, points, house) => {
  const logEntry = {
    user: user,
    points: points,
    house: house,
    ts: new Date().toString()
  };
  db.log.save(logEntry, (err, results) => {
    if(err) throw err;
    return true;
  });
};

// Make and store a new token and expiration 
const makeToken = user => {
  const tokenPart = Math.random().toString(36).substr(2);
  const token = tokenPart + tokenPart;
  const expires = Date.now() + 604800000;
  db.users.update({user: user}, {$push: {tokens: {token: token, expires: expires}}}, (err, results) => {
    if(err) throw err;
  });
  return [token, expires];
};

// Routes
app.post("/api/add", (req, res) => {
  db.houses.find({house: req.body.house}, (err, results) => {
    if(err) throw err;
    let currentPoints = parseInt(results[0].points);
    let revisedPoints = currentPoints + 1;
    dbLog("testadd", 1, req.body.house);
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
    dbLog("testsub", -1, req.body.house);
    db.houses.update({house: req.body.house}, {$set: {points: revisedPoints}}, () => {
      res.status(200).end();
    });
  });
});

app.post("/api/auth", (req, res) => {
  if(!req.body.user || !req.body.password){
    res.json({ success: false });
  }else{
    db.users.find({user: req.body.user}, (err, results) => {
      if(err) throw err;
      bcrypt.compare(req.body.password, results[0].password, function(err, result) {
        if(err) throw err;
        if(result === true){
          const token = makeToken(req.body.user);
          res.json({ success: true, token: token });
        }else if(result === false){
          res.json({ success: false });
        }else{
          res.json({ success: false });
        }
      });
    });
  }
});

app.post("/api/validate", (req, res) => {
  let userToken;
  let userExpire;
  let user;
  let tokenFound = false;

  if(!req.body.token || !req.body.user){
    res.json({ success: false });
  }else{
    db.users.find({user: req.body.user}, (err, results) => {
      if(err) throw err;
      
      results[0].tokens.forEach(e => {
        if(e.token === req.body.token){
          tokenFound = true;
          userToken = e.token;
          userExpire = e.expires;
          user = results[0].user;
        }
      });

      if(tokenFound === true){
        const currentTS = Date.now();
        if(currentTS > userExpire){
          res.json({ success: false });
        }else if(currentTS < userExpire){
          res.json({ success: true });
        }
      }else if(tokenFound === false){
        res.json({ success: false });
      }else{
        res.json({ success: false });
      }

    });
  }
});

// app.post("/api/hash", (req, res) => {
//   bcrypt.hash(req.body.password, 10, function(err, hash) {
//     res.json({ hash: hash });
//   });
// });

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
