const mongojs = require("mongojs");
require('dotenv').config();

// Mongo connection
// "houses" stores the houses available, their names, images, points, and owl status
// "users" stores any users that can login
// "log" stores any individual point changes -- LOG IS NOT SEEDED
// "challenge" stores the current challenge
const db = mongojs(process.env.MONGODB_URI, ["houses", "users", "log", "challenge"]);

db.on("error", error => {
  console.log("Database Error: ", error);
});

// HOUSES
const houseGH = {
    "house" : "Githubblepuff",
    "master" : "Lily Tomlin",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "gh.png",
    "owlimage" : "gh_owl.png"
};
const houseRC = {
    "house" : "Ravenclosure",
    "master" : "Ellen Degeneres",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "rc.png",
    "owlimage" : "rc_owl.png"
};
const houseSIYC = {
    "house" : "SlytherindentYourCode",
    "master" : "Cameron Esposito",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "siyc.png",
    "owlimage" : "siyc_owl.png"
};
const houseGD = {
    "house" : "GryffinDOM",
    "master" : "Rhea Butcher",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "gd.png",
    "owlimage" : "gd_owl.png"
};

db.houses.save(houseGH, (err, results) => {
    if (err) throw err;
    console.log("House Githubblepuff written");
});
db.houses.save(houseRC, (err, results) => {
    if (err) throw err;
    console.log("House Ravenclosure written");
});
db.houses.save(houseSIYC, (err, results) => {
    if (err) throw err;
    console.log("House SlytherindentYourCode written");
});
db.houses.save(houseGD, (err, results) => {
    if (err) throw err;
    console.log("House GryffinDOM written");
});

// USERS
// Default username is "user"
// Default password is "MERNmaster90"
const defaultUser = {
    "user" : "user",
    "password" : "$2b$10$sYPoVDru7GlfB12LRipNTe8umAqcO2KEMSOrYmICk8rNoeda09B1G",
}
db.users.save(defaultUser, (err, results) => {
    if (err) throw err;
    console.log("Default user written");
});

// CHALLENGE
const challengeDocument = {
    "challenge" : "15 points to the largest study group by 10pm Sunday"
}
db.challenge.save(challengeDocument, (err, results) => {
    if (err) throw err;
    console.log("Challenge document written");
});