var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost", // Replace with your host name
  user: "root", // Replace with your database username
  password: "12345", // Replace with your database password
  database: "cosmic_assian12thjan", // // Replace with your database Name
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = conn;
