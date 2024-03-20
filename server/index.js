var mysql = require("mysql");

var con = mysql.createConnection({
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

// Insert test data into the table
const testData = [
   ["test-title", "descr-test", "10", "15:00", "hidden", "23"],
   ["test-title2", "descr-test2", "20", "16:00", "visible", "24"],
   // Add more rows as needed
];

const sql =
   "INSERT INTO events (title, description, coordinates, time, visible, id_user) VALUES ?";

con.query(sql, [testData], (error, results, fields) => {
   if (error) {
      console.error("Error inserting test data:", error);
      return;
   }
   console.log(
      "Test data inserted successfully:",
      results.affectedRows,
      "rows affected"
   );
});

// Close the connection
con.end();
