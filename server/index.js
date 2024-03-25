const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const con = mysql.createConnection({
  host: "liderpma.finistcom.kz",
  user: "eventmakeruser",
  password: "eventmaker0947",
  database: "eventmaker", // Add your database name here
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL database:", err.stack);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Endpoint to access all the markers
app.get("/markers", (req, res) => {
  console.log("asdsad");
  try {
    con.query("SELECT * FROM events", (error, rows, fields) => {
      if (error) console.log("Error:", error);
      else {
        console.log(rows);
        res.json(rows);
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
// // Insert test data into the table
// const testData = [
//   ["test-title", "descr-test", "10", "15:00", "hidden", "23"],
//   ["test-title2", "descr-test2", "20", "16:00", "visible", "24"],
//   // Add more rows as needed
// ];

// const sql =
//   "INSERT INTO events (title, description, coordinates, time, visible, id_user) VALUES ?";

// con.query(sql, [testData], (error, results, fields) => {
//   if (error) {
//     console.error("Error inserting test data:", error);
//     return;
//   }
//   console.log(
//     "Test data inserted successfully:",
//     results.affectedRows,
//     "rows affected"
//   );
// });

// Close the connection
// con.end();

app.listen(port, () => {
  console.log("Server running on port", port);
});
