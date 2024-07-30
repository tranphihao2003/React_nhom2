var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "reactjs",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

module.exports = db;
